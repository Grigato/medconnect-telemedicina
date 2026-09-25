begin;

-- Amplia a etapa 5 para que o paciente de teste também possa anexar
-- resultados e imagens fictícios à própria consulta.
-- Não enviar documentos, exames, receitas ou fotografias reais.

update storage.buckets
set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array[
    'application/pdf',
    'image/jpeg',
    'image/png'
  ]
where id = 'appointment-documents';

alter table public.appointment_documents
  drop constraint if exists appointment_documents_document_type_check;

alter table public.appointment_documents
  add constraint appointment_documents_document_type_check
  check (
    document_type in (
      'prescription',
      'exam_request',
      'exam_result',
      'image',
      'other'
    )
  );

alter table public.appointment_documents
  drop constraint if exists appointment_documents_mime_type_check;

alter table public.appointment_documents
  add constraint appointment_documents_mime_type_check
  check (
    mime_type in (
      'application/pdf',
      'image/jpeg',
      'image/png'
    )
  );

-- A função agora reconhece os dois participantes da consulta. O vínculo do
-- profissional continua sendo conferido pelo catálogo associado ao perfil.
create or replace function public.current_user_can_upload_document(
  target_appointment_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_can_access_appointment(target_appointment_id)
$$;

create or replace function public.current_user_is_assigned_doctor(
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

revoke all on function public.current_user_is_assigned_doctor(uuid) from public;
grant execute on function public.current_user_is_assigned_doctor(uuid) to authenticated;

drop policy if exists "Profissional envia documento da consulta" on public.appointment_documents;
drop policy if exists "Participantes enviam documento da consulta" on public.appointment_documents;

create policy "Participantes enviam documento da consulta"
on public.appointment_documents
for insert
to authenticated
with check (
  uploaded_by = auth.uid()
  and public.current_user_can_upload_document(appointment_id)
  and (
    document_type in ('exam_result', 'image', 'other')
    or public.current_user_is_assigned_doctor(appointment_id)
  )
);

drop policy if exists "Profissional envia PDF demonstrativo" on storage.objects;
drop policy if exists "Participantes enviam arquivo demonstrativo" on storage.objects;

create policy "Participantes enviam arquivo demonstrativo"
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

-- Verificação administrativa: o bucket deve listar PDF, JPEG e PNG,
-- permanecendo privado.
select id, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'appointment-documents';
