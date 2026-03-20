-- Tasks table for Platform Roadmap tracking
-- Run this in Supabase SQL editor

create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  detailed_description text,
  status text not null default 'backlog'
    check (status in ('backlog', 'todo', 'in_progress', 'review', 'done')),
  priority text not null default 'p2'
    check (priority in ('p0', 'p1', 'p2', 'p3')),
  wave integer not null default 1
    check (wave between 0 and 4),
  effort text not null default 'm'
    check (effort in ('xs', 's', 'm', 'l', 'xl')),
  source text not null default 'audit'
    check (source in ('audit', 'backlog', 'strategy')),
  jobs_served text,
  ajtbd_tier text check (ajtbd_tier in ('s', 'a', 'b', 'c')),
  segment text check (segment in ('agent', 'developer', 'investor', 'agency')),
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS policies
alter table tasks enable row level security;

create policy "Authenticated users can read tasks"
  on tasks for select to authenticated using (true);

create policy "Authenticated users can update tasks"
  on tasks for update to authenticated using (true);

create policy "Authenticated users can insert tasks"
  on tasks for insert to authenticated with check (true);

-- Auto-update updated_at trigger
create or replace function update_tasks_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_tasks_updated_at();
