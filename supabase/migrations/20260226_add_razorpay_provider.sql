alter table public.subscriptions
drop constraint if exists subscriptions_provider_check;

alter table public.subscriptions
add constraint subscriptions_provider_check
check (provider in ('stripe', 'razorpay'));
