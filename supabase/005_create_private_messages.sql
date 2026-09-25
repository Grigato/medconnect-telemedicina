begin;

-- Etapa 4: comunicação privada e demonstrativa por consulta.
-- Use somente contas, mensagens e links fictícios neste projeto acadêmico.
-- Não registrar dados clínicos, receitas, documentos ou links reais de pacientes.

-- Um perfil de profissional de teste pode ser associado a um registro já
-- existente no catálogo. A coluna não é liberada para atualização pelo cliente.
alter table public.profiles
  add column if not exists professional_id uuid
  references public.professionals(id) on delete set null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_professional_id_unique'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_professional_id_unique unique (professional_id);
  end if;
end;
$$;

-- Mantém o papel e o vínculo profissional sob controle administrativo.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if (
    new.role is distinct from old.role
    or new.professional_id is distinct from old.professional_id
  ) and current_user not in ('postgres', 'service_role') then
    raise exception 'O papel e o vínculo profissional só podem ser alterados no ambiente administrativo de teste.';
  end if;

  new.updated_at = now();
  return new;
end;
$$;

-- Paciente lê a própria consulta. Profissional de teste lê apenas consultas
-- vinculadas ao profissional do seu perfil.
drop policy if exists "Paciente le apenas as proprias consultas" on public.appointments;
drop policy if exists "Participantes leem as consultas vinculadas" on public.appointments;

create policy "Participantes leem as consultas vinculadas"
on public.appointments
for select
to authenticated
using (
  patient_id = (select auth.uid())
  or exists (
    select 1
    from public.profiles as profile
    where profile.id = (select auth.uid())
      and profile.role = 'doctor'
      and profile.professional_id = appointments.professional_id
  )
);

create table if not exists public.appointment_messages (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  sender_type text not null check (sender_type in ('patient', 'professional')),
  content text not null check (char_length(trim(content)) between 1 and 1000),
  meeting_platform text,
  meeting_url text check (
    meeting_url is null
    or meeting_url ~ '^https://[^[:space:]]+$'
  ),
  created_at timestamptz not null default now(),
  constraint appointment_messages_link_has_platform check (
    meeting_url is null or meeting_platform is not null
  )
);

create index if not exists appointment_messages_appointment_created_at_idx
on public.appointment_messages (appointment_id, created_at);

alter table public.appointment_messages
enable row level security;

revoke all on table public.appointment_messages from anon, authenticated;
grant select, insert on table public.appointment_messages to authenticated;

drop policy if exists "Participantes leem mensagens da consulta" on public.appointment_messages;
create policy "Participantes leem mensagens da consulta"
on public.appointment_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.appointments as appointment
    left join public.profiles as profile
      on profile.id = (select auth.uid())
    where appointment.id = appointment_messages.appointment_id
      and (
        appointment.patient_id = (select auth.uid())
        or (
          profile.role = 'doctor'
          and profile.professional_id = appointment.professional_id
        )
      )
  )
);

drop policy if exists "Participantes enviam mensagens da consulta" on public.appointment_messages;
create policy "Participantes enviam mensagens da consulta"
on public.appointment_messages
for insert
to authenticated
with check (
  sender_id = (select auth.uid())
  and exists (
    select 1
    from public.appointments as appointment
    left join public.profiles as profile
      on profile.id = (select auth.uid())
    where appointment.id = appointment_messages.appointment_id
      and (
        (
          sender_type = 'patient'
          and appointment.patient_id = (select auth.uid())
        )
        or (
          sender_type = 'professional'
          and profile.role = 'doctor'
          and profile.professional_id = appointment.professional_id
        )
      )
  )
);

commit;

-- Depois de criar e confirmar uma conta de PROFISSIONAL DE TESTE pelo fluxo
-- de cadastro existente, execute somente este bloco, trocando o e-mail de teste.
-- Ele associa a conta à Dra. Helena Freire do catálogo fictício.
--
-- update public.profiles
-- set
--   role = 'doctor',
--   professional_id = (
--     select id
--     from public.professionals
--     where name = 'Dra. Helena Freire'
--   )
-- where id = (
--   select id
--   from auth.users
--   where email = 'medica.teste@exemplo.com'
-- );

-- Verificação administrativa. A conta de profissional deve aparecer associada
-- a um único registro fictício do catálogo.
select
  profile.full_name,
  profile.role,
  professional.name as profissional_associado
from public.profiles as profile
left join public.professionals as professional
  on professional.id = profile.professional_id
where profile.role = 'doctor';
