create extension if not exists pgcrypto;

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  name text not null,
  slug text not null unique,
  industry text not null,
  tone text not null,
  location text not null,
  goal text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  content_json jsonb not null default '{"sections":[]}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists sites_user_id_idx on public.sites (user_id);
create index if not exists sites_slug_idx on public.sites (slug);
create index if not exists sites_status_idx on public.sites (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists sites_set_updated_at on public.sites;
create trigger sites_set_updated_at
before update on public.sites
for each row
execute function public.set_updated_at();

alter table public.sites enable row level security;

create policy "Users can read own sites"
on public.sites
for select
using (auth.uid()::text = user_id);

create policy "Users can insert own sites"
on public.sites
for insert
with check (auth.uid()::text = user_id);

create policy "Users can update own sites"
on public.sites
for update
using (auth.uid()::text = user_id)
with check (auth.uid()::text = user_id);

create policy "Published sites are public"
on public.sites
for select
using (status = 'published');
