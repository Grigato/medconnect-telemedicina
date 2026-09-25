begin;

-- Corrige a política da etapa 4 sem alterar contas, consultas ou mensagens.
-- A verificação é executada com privilégios controlados para evitar uma
-- recursão entre as políticas de profiles e appointments.

create or replace function public.current_doctor_can_view_patient(
  patient_profile_id uuid
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
    where appointment.patient_id = patient_profile_id
      and doctor_profile.role = 'doctor'
      and doctor_profile.professional_id = appointment.professional_id
  )
$$;

revoke all on function public.current_doctor_can_view_patient(uuid) from public;
grant execute on function public.current_doctor_can_view_patient(uuid) to authenticated;

drop policy if exists "Profissional le paciente de consulta atribuida" on public.profiles;

create policy "Profissional le paciente de consulta atribuida"
on public.profiles
for select
to authenticated
using (public.current_doctor_can_view_patient(id));

commit;

-- Verificação administrativa: lista as consultas e os nomes fictícios
-- vinculados. Não representa uma consulta feita pelo navegador.
select
  appointment.id,
  patient.full_name as paciente,
  professional.name as profissional
from public.appointments as appointment
join public.profiles as patient on patient.id = appointment.patient_id
join public.professionals as professional on professional.id = appointment.professional_id
order by appointment.created_at desc;
