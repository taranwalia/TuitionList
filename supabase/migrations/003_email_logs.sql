create table if not exists public.email_logs (
  id uuid primary key default gen_random_uuid(),
  recipient text not null,
  subject text not null,
  status text not null check (status in ('sent', 'failed', 'skipped')),
  provider text not null default 'resend',
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists email_logs_created_at_idx on public.email_logs (created_at desc);
create index if not exists email_logs_status_idx on public.email_logs (status);
create index if not exists email_logs_recipient_idx on public.email_logs (recipient);

alter table public.email_logs enable row level security;

drop policy if exists "Admins can read email logs" on public.email_logs;
create policy "Admins can read email logs"
on public.email_logs
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.auth_user_id = auth.uid()
      and profiles.role = 'admin'
  )
);

grant select on public.email_logs to authenticated;
