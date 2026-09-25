begin;

-- Etapa 5: documentos exclusivamente demonstrativos.
-- Aceita apenas PDFs fictícios vinculados a uma consulta de teste.
-- Não enviar receitas, pedidos, laudos ou dados reais de saúde.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'appointment-documents',
  'appointment-documents',
  false,
  5242880,
  array['application/pdf']
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.appointment_documents (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  document_type text not null check (
    document_type in ('prescription', 'exam_request', 'other')
  ),
  file_name text not null check (char_length(trim(file_name)) between 1 and 160),
  storage_path text not null unique check (char_length(trim(storage_path)) between 1 and 500),
  mime_type text not null default 'application/pdf' check (mime_type = 'application/pdf'),
  created_at timestamptz not null default now()
);

create index if not exists appointment_documents_appointment_created_at_idx
on public.appointment_documents (appointment_id, created_at desc);

alter table public.appointment_documents enable row level security;

revoke all on table public.appointment_documents from anon, authenticated;
grant select, insert on table public.appointment_documents to authenticated;

-- Funções de autorização isolam a regra de participante e evitam políticas
-- recursivas ao consultar consultas, perfis e documentos.
create or replace function public.current_user_can_access_appointment(
  target_appointment_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.appointments as appointment
    left join public.profiles as doctor_profile
      on doctor_profile.id = auth.uid()
    where appointment.id = target_appointment_id
      and (
        appointment.patient_id = auth.uid()
        or (
          doctor_profile.role = 'doctor'
          and doctor_profile.professional_id = appointment.professional_id
        )
      )
  )
$$;

create or replace function public.current_user_can_upload_document(
  target_appointment_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.appointments as appointment
    join public.profiles as doctor_profile
      on doctor_profile.id = auth.uid()
    where appointment.id = target_appointment_id
      and doctor_profile.role = 'doctor'
      and doctor_profile.professional_id = appointment.professional_id
  )
$$;

revoke all on function public.current_user_can_access_appointment(uuid) from public;
revoke all on function public.current_user_can_upload_document(uuid) from public;
grant execute on function public.current_user_can_access_appointment(uuid) to authenticated;
grant execute on function public.current_user_can_upload_document(uuid) to authenticated;

drop policy if exists "Participantes leem documentos da consulta" on public.appointment_documents;
create policy "Participantes leem documentos da consulta"
on public.appointment_documents
for select
to authenticated
using (public.current_user_can_access_appointment(appointment_id));

drop policy if exists "Profissional envia documento da consulta" on public.appointment_documents;
create policy "Profissional envia documento da consulta"
on public.appointment_documents
for insert
to authenticated
with check (
  uploaded_by = auth.uid()
  and public.current_user_can_upload_document(appointment_id)
);

-- Objetos do bucket privado só podem ser lidos pelos participantes da consulta
-- e só podem ser enviados pela profissional de teste associada.
drop policy if exists "Participantes baixam documento demonstrativo" on storage.objects;
create policy "Participantes baixam documento demonstrativo"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'appointment-documents'
  and exists (
    select 1
    from public.appointment_documents as document
    where document.storage_path = name
      and public.current_user_can_access_appointment(document.appointment_id)
  )
);

drop policy if exists "Profissional envia PDF demonstrativo" on storage.objects;
create policy "Profissional envia PDF demonstrativo"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'appointment-documents'
  and exists (
    select 1
    from public.appointment_documents as document
    where document.storage_path = name
      and document.uploaded_by = auth.uid()
      and public.current_user_can_upload_document(document.appointment_id)
  )
);

commit;

-- Verificação administrativa: a tabela deve estar vazia no primeiro teste,
-- e o bucket appointment-documents deve aparecer como privado.
select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'appointment-documents';

select id, appointment_id, document_type, file_name, created_at
from public.appointment_documents
order by created_at desc;
