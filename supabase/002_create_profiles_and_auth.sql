begin;

-- Etapa 1: contas de demonstração, perfis privados e papéis de teste.
-- Não cadastrar CPF, endereço, dados de saúde ou documentos reais nesta fase.

do $$
begin
  create type public.user_role as enum ('patient', 'doctor');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Conta de teste',
  role public.user_role not null default 'patient',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists full_name text not null default 'Conta de teste';

alter table public.profiles
  add column if not exists role public.user_role not null default 'patient';

alter table public.profiles
  add column if not exists created_at timestamptz not null default now();

alter table public.profiles
  add column if not exists updated_at timestamptz not null default now();

alter table public.profiles
enable row level security;

-- Cria perfis para contas de teste que já existiam antes deste script.
insert into public.profiles (id, full_name, role)
select
  users.id,
  coalesce(nullif(trim(users.raw_user_meta_data ->> 'full_name'), ''), 'Conta de teste'),
  'patient'::public.user_role
from auth.users as users
on conflict (id) do nothing;

-- Um novo cadastro pelo Supabase Auth recebe um perfil de paciente de teste.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Conta de teste'),
    'patient'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Usuários da aplicação não podem transformar a própria conta em profissional.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role
    and current_user not in ('postgres', 'service_role') then
    raise exception 'A função da conta só pode ser alterada no ambiente administrativo de teste.';
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profile_updated on public.profiles;

create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.protect_profile_role();

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (full_name) on table public.profiles to authenticated;

drop policy if exists "Perfil próprio pode ser lido" on public.profiles;
create policy "Perfil próprio pode ser lido"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Perfil próprio pode ser atualizado" on public.profiles;
create policy "Perfil próprio pode ser atualizado"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

commit;

-- Após criar uma segunda conta de TESTE para o profissional, execute este
-- comando separadamente no SQL Editor, trocando o e-mail pelo e-mail de teste:
--
-- update public.profiles
-- set role = 'doctor'
-- where id = (
--   select id from auth.users where email = 'medico.teste@exemplo.com'
-- );
