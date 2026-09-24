begin;

-- Etapa 3: fila persistida para consultas demonstrativas.
-- A aplicação continua com visão exclusiva do paciente. O paciente apenas
-- visualiza sua situação; ele não pode alterar a própria posição na fila.

create table if not exists public.appointment_queue (
  appointment_id uuid primary key references public.appointments(id) on delete cascade,
  position smallint not null default 3 check (position >= 1),
  status text not null default 'waiting'
    check (status in ('waiting', 'ready')),
  updated_at timestamptz not null default now()
);

alter table public.appointment_queue
enable row level security;

revoke all on table public.appointment_queue from anon, authenticated;
grant select on table public.appointment_queue to authenticated;

drop policy if exists "Paciente le apenas a propria fila" on public.appointment_queue;
create policy "Paciente le apenas a propria fila"
on public.appointment_queue
for select
to authenticated
using (
  exists (
    select 1
    from public.appointments as appointment
    where appointment.id = appointment_queue.appointment_id
      and appointment.patient_id = (select auth.uid())
  )
);

create or replace function public.create_appointment_queue()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.appointment_queue (appointment_id)
  values (new.id)
  on conflict (appointment_id) do nothing;

  return new;
end;
$$;

revoke all on function public.create_appointment_queue() from public;

drop trigger if exists on_appointment_created on public.appointments;

create trigger on_appointment_created
  after insert on public.appointments
  for each row execute procedure public.create_appointment_queue();

create or replace function public.touch_appointment_queue_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.touch_appointment_queue_updated_at() from public;

drop trigger if exists on_appointment_queue_updated on public.appointment_queue;

create trigger on_appointment_queue_updated
  before update on public.appointment_queue
  for each row execute procedure public.touch_appointment_queue_updated_at();

-- Cria a fila também para consultas que já existiam antes deste script.
insert into public.appointment_queue (appointment_id)
select appointment.id
from public.appointments as appointment
on conflict (appointment_id) do nothing;

commit;

-- Verificação: a consulta criada na etapa 2 deve aparecer com posição 3.
select
  appointment.id as consulta_id,
  professional.name as profissional,
  queue.position,
  queue.status,
  queue.updated_at
from public.appointment_queue as queue
join public.appointments as appointment on appointment.id = queue.appointment_id
join public.professionals as professional on professional.id = appointment.professional_id
order by queue.updated_at desc;

-- Para demonstrar a atualização posteriormente, execute este bloco
-- separadamente no SQL Editor. Ele é uma ação administrativa de teste,
-- não uma ação disponível ao paciente na interface:
--
-- update public.appointment_queue
-- set position = 1,
--     status = 'ready'
-- where appointment_id = 'UUID_DA_CONSULTA_DE_TESTE';
