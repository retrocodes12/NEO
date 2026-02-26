create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('stripe', 'razorpay')),
  clerk_user_id text,
  plan text not null default 'pro',
  status text not null,
  provider_customer_id text,
  provider_subscription_id text not null,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_subscription_id)
);

create index if not exists subscriptions_clerk_user_id_idx on public.subscriptions (clerk_user_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

alter table public.subscriptions enable row level security;

create policy "Users can read own subscriptions"
on public.subscriptions
for select
using (auth.uid()::text = clerk_user_id);
