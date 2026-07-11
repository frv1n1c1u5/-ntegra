create extension if not exists pgcrypto;

create type public.profile_status as enum ('active', 'inactive');
create type public.lead_stage as enum ('novo', 'contato_iniciado', 'aguardando_documentos', 'qualificado', 'proposta_enviada', 'convertido', 'perdido');
create type public.case_stage as enum ('triagem', 'aguardando_pagamento', 'aguardando_documentos', 'em_analise', 'em_revisao', 'pronto_para_entrega', 'entregue', 'encerrado', 'cancelado');
create type public.case_type as enum ('analise_inicial', 'segunda_opiniao', 'suporte', 'fgc', 'conflito_interesse', 'produto_estruturado');
create type public.payment_status as enum ('pendente', 'parcial', 'pago', 'reembolsado', 'cancelado');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  status public.profile_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  normalized_phone text not null,
  email text not null,
  institution text not null,
  issue_type text not null,
  amount_range text not null,
  urgency text not null,
  notes text,
  source text not null default 'site',
  stage public.lead_stage not null default 'novo',
  owner_id uuid references public.profiles(id),
  consent_at timestamptz not null,
  consent_text_version text not null default '2026-07-v1',
  duplicate_of uuid references public.leads(id),
  lost_reason text,
  converted_client_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  institutions text[] not null default '{}',
  internal_notes text,
  created_from_lead_id uuid references public.leads(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.leads add constraint leads_converted_client_fk foreign key (converted_client_id) references public.clients(id);

create table public.cases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id),
  title text not null,
  case_type public.case_type not null,
  stage public.case_stage not null default 'triagem',
  institution text,
  product_name text,
  scope text,
  analyzed_amount numeric(14,2),
  priority smallint not null default 2 check (priority between 1 and 3),
  owner_id uuid references public.profiles(id),
  delivered_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_notes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  note_type text not null default 'observacao',
  body text not null,
  author_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.cases(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  title text not null,
  due_at timestamptz,
  priority smallint not null default 2 check (priority between 1 and 3),
  assignee_id uuid references public.profiles(id),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  check (case_id is not null or lead_id is not null)
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  category text not null,
  original_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 20971520),
  uploaded_by uuid not null references public.profiles(id),
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  due_date date,
  method text,
  status public.payment_status not null default 'pendente',
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activities (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index leads_stage_created_idx on public.leads(stage, created_at desc);
create index leads_phone_idx on public.leads(normalized_phone);
create index cases_stage_idx on public.cases(stage, updated_at desc);
create index tasks_due_idx on public.tasks(completed_at, due_at);
create index documents_case_idx on public.documents(case_id, created_at desc);
create index activities_entity_idx on public.activities(entity_type, entity_id, created_at desc);

create or replace function public.is_active_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and status = 'active') $$;

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.clients enable row level security;
alter table public.cases enable row level security;
alter table public.case_notes enable row level security;
alter table public.tasks enable row level security;
alter table public.documents enable row level security;
alter table public.payments enable row level security;
alter table public.activities enable row level security;

create policy staff_profiles on public.profiles for select to authenticated using (public.is_active_staff());
create policy staff_leads on public.leads for all to authenticated using (public.is_active_staff()) with check (public.is_active_staff());
create policy staff_clients on public.clients for all to authenticated using (public.is_active_staff()) with check (public.is_active_staff());
create policy staff_cases on public.cases for all to authenticated using (public.is_active_staff()) with check (public.is_active_staff());
create policy staff_notes on public.case_notes for all to authenticated using (public.is_active_staff()) with check (public.is_active_staff());
create policy staff_tasks on public.tasks for all to authenticated using (public.is_active_staff()) with check (public.is_active_staff());
create policy staff_documents on public.documents for all to authenticated using (public.is_active_staff()) with check (public.is_active_staff());
create policy staff_payments on public.payments for all to authenticated using (public.is_active_staff()) with check (public.is_active_staff());
create policy staff_activities on public.activities for select to authenticated using (public.is_active_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('case-documents', 'case-documents', false, 20971520, array['application/pdf','image/png','image/jpeg','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy staff_storage_select on storage.objects for select to authenticated using (bucket_id = 'case-documents' and public.is_active_staff());
create policy staff_storage_insert on storage.objects for insert to authenticated with check (bucket_id = 'case-documents' and public.is_active_staff());
create policy staff_storage_update on storage.objects for update to authenticated using (bucket_id = 'case-documents' and public.is_active_staff());
create policy staff_storage_delete on storage.objects for delete to authenticated using (bucket_id = 'case-documents' and public.is_active_staff());

