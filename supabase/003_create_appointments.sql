begin;

-- Etapa 2: horários e consultas exclusivamente demonstrativos.
-- A aplicação possui somente a visão do paciente. O profissional abaixo é
-- uma referência ao catálogo fictício, e não uma conta de profissional.
-- Não use nomes, horários ou dados clínicos reais.

create table if not exists public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professionals(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'available'
    check (status in ('available', 'booked')),
  created_at timestamptz not null default now(),
  constraint availability_slot_valid_interval check (ends_at > starts_at),
  constraint availability_slot_professional_starts_at_key unique (professional_id, starts_at),
  constraint availability_slots_id_professional_key unique (id, professional_id)
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references auth.users(id) on delete cascade,
  professional_id uuid not null references public.professionals(id) on delete restrict,
  slot_id uuid not null unique references public.availability_slots(id) on delete restrict,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'waiting', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  constraint appointment_slot_matches_professional
    foreign key (slot_id, professional_id)
    references public.availability_slots(id, professional_id)
);

alter table public.availability_slots
enable row level security;

alter table public.appointments
enable row level security;

revoke all on table public.availability_slots from anon, authenticated;
revoke all on table public.appointments from anon, authenticated;
grant select on table public.availability_slots to authenticated;
grant select on table public.appointments to authenticated;

drop policy if exists "Paciente autenticado le horarios demonstrativos" on public.availability_slots;
create policy "Paciente autenticado le horarios demonstrativos"
on public.availability_slots
for select
to authenticated
using (true);

drop policy if exists "Paciente le apenas as proprias consultas" on public.appointments;
create policy "Paciente le apenas as proprias consultas"
on public.appointments
for select
to authenticated
using ((select auth.uid()) = patient_id);

-- Reserva uma vaga de forma atômica. Não há INSERT direto para o navegador.
-- O bloqueio da vaga impede que duas contas reservem a mesma vaga; o bloqueio
-- consultivo do paciente e a verificação de intervalo impedem reservas
-- simultâneas do mesmo paciente em horários que se sobrepõem.
create or replace function public.book_appointment(p_slot_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_patient_id uuid := auth.uid();
  v_slot public.availability_slots%rowtype;
  v_appointment_id uuid;
begin
  if v_patient_id is null then
    raise exception 'É necessário entrar com uma conta de paciente de teste.';
  end if;

  perform pg_advisory_xact_lock(hashtext(v_patient_id::text));

  select *
  into v_slot
  from public.availability_slots
  where id = p_slot_id
    and status = 'available'
  for update;

  if not found then
    raise exception 'Este horário não está mais disponível. Atualize a lista e tente outro.';
  end if;

  if exists (
    select 1
    from public.appointments as appointment
    join public.availability_slots as booked_slot
      on booked_slot.id = appointment.slot_id
    where appointment.patient_id = v_patient_id
      and appointment.status in ('scheduled', 'waiting', 'in_progress')
      and tstzrange(booked_slot.starts_at, booked_slot.ends_at, '[)')
          && tstzrange(v_slot.starts_at, v_slot.ends_at, '[)')
  ) then
    raise exception 'Você já possui uma consulta neste intervalo.';
  end if;

  insert into public.appointments (patient_id, professional_id, slot_id)
  values (v_patient_id, v_slot.professional_id, v_slot.id)
  returning id into v_appointment_id;

  update public.availability_slots
  set status = 'booked'
  where id = v_slot.id;

  return v_appointment_id;
end;
$$;

revoke all on function public.book_appointment(uuid) from public;
grant execute on function public.book_appointment(uuid) to authenticated;

-- Insere horários fictícios somente na primeira execução bem-sucedida.
-- A data é gerada no momento da execução, sempre no fuso de São Paulo.
with seed (professional_name, starts_at) as (
  values
    ('Dra. Helena Freire', ((current_date + 1)::timestamp + time '10:00') at time zone 'America/Sao_Paulo'),
    ('Dra. Helena Freire', ((current_date + 1)::timestamp + time '14:30') at time zone 'America/Sao_Paulo'),
    ('Dra. Helena Freire', ((current_date + 2)::timestamp + time '11:30') at time zone 'America/Sao_Paulo'),
    ('Dr. Lucas Menezes', ((current_date + 1)::timestamp + time '11:30') at time zone 'America/Sao_Paulo'),
    ('Dr. Lucas Menezes', ((current_date + 1)::timestamp + time '16:00') at time zone 'America/Sao_Paulo'),
    ('Dr. Lucas Menezes', ((current_date + 2)::timestamp + time '10:00') at time zone 'America/Sao_Paulo')
)
insert into public.availability_slots (professional_id, starts_at, ends_at)
select
  professional.id,
  seed.starts_at,
  seed.starts_at + interval '45 minutes'
from seed
join public.professionals as professional
  on professional.name = seed.professional_name
where not exists (select 1 from public.availability_slots)
on conflict (professional_id, starts_at) do nothing;

commit;

-- Verificação depois de executar o bloco acima.
select
  slot.id,
  professional.name as profissional,
  professional.specialty as especialidade,
  slot.starts_at,
  slot.ends_at,
  slot.status
from public.availability_slots as slot
join public.professionals as professional on professional.id = slot.professional_id
order by slot.starts_at, professional.name;
