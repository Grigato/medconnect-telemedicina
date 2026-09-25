begin;

-- Etapa 4: permite que o profissional de teste veja apenas o nome do
-- paciente vinculado a uma consulta atribuída ao seu próprio catálogo.
-- O projeto continua usando exclusivamente contas e dados fictícios.

-- Expõe a relação entre a consulta e o perfil do paciente para consultas
-- aninhadas no cliente. O perfil já é criado junto da conta de teste.
alter table public.appointments
  drop constraint if exists appointments_patient_profile_fkey;

alter table public.appointments
  add constraint appointments_patient_profile_fkey
  foreign key (patient_id)
  references public.profiles(id)
  on delete cascade;

-- A função usa o perfil da própria sessão sem criar uma política recursiva
-- sobre a tabela profiles.
create or replace function public.current_doctor_professional_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select professional_id
  from public.profiles
  where id = auth.uid()
    and role = 'doctor'
$$;

revoke all on function public.current_doctor_professional_id() from public;
grant execute on function public.current_doctor_professional_id() to authenticated;

drop policy if exists "Profissional le paciente de consulta atribuida" on public.profiles;

create policy "Profissional le paciente de consulta atribuida"
on public.profiles
for select
to authenticated
using (
  exists (
    select 1
    from public.appointments as appointment
    where appointment.patient_id = profiles.id
      and appointment.professional_id = public.current_doctor_professional_id()
  )
);

commit;

-- Verificação administrativa: o profissional de teste deve visualizar o nome
-- fictício do paciente somente nas consultas que lhe foram atribuídas.
select
  appointment.id,
  patient.full_name as paciente,
  professional.name as profissional
from public.appointments as appointment
join public.profiles as patient on patient.id = appointment.patient_id
join public.professionals as professional on professional.id = appointment.professional_id
order by appointment.created_at desc;
