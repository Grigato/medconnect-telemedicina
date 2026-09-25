begin;

-- Profissional e horários exclusivamente fictícios para a Etapa 4.
-- Não utilizar dados, disponibilidade ou credenciais de pessoa real.

insert into public.professionals (name, specialty, description)
select
  'Dra. Gabriela Reis',
  'Neurologia',
  'Profissional fictícia para demonstração acadêmica da MedConnect.'
where not exists (
  select 1
  from public.professionals
  where name = 'Dra. Gabriela Reis'
);

-- Horários fictícios futuros para permitir a reserva e o teste do chat.
with professional as (
  select id
  from public.professionals
  where name = 'Dra. Gabriela Reis'
), slots (starts_at) as (
  values
    (((current_date + 1)::timestamp + time '09:30') at time zone 'America/Sao_Paulo'),
    (((current_date + 1)::timestamp + time '15:00') at time zone 'America/Sao_Paulo'),
    (((current_date + 2)::timestamp + time '11:00') at time zone 'America/Sao_Paulo')
)
insert into public.availability_slots (professional_id, starts_at, ends_at)
select
  professional.id,
  slots.starts_at,
  slots.starts_at + interval '45 minutes'
from professional
cross join slots
on conflict (professional_id, starts_at) do nothing;

commit;

-- Verificação: deve listar a profissional fictícia e três horários disponíveis.
select
  professional.name,
  professional.specialty,
  slot.starts_at,
  slot.ends_at,
  slot.status
from public.professionals as professional
left join public.availability_slots as slot
  on slot.professional_id = professional.id
where professional.name = 'Dra. Gabriela Reis'
order by slot.starts_at;
