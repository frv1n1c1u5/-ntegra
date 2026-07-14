create type public.pricing_model as enum ('fixed', 'starting_at', 'hourly', 'percentage', 'hybrid', 'custom');

alter type public.payment_status add value if not exists 'rascunho';
alter type public.payment_status add value if not exists 'enviado';
alter type public.payment_status add value if not exists 'vencido';
alter type public.payment_status add value if not exists 'estornado';

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  badge text,
  description text not null,
  pricing_model public.pricing_model not null default 'custom',
  base_price numeric(12,2) check (base_price is null or base_price >= 0),
  percentage_rate numeric(7,4) check (percentage_rate is null or percentage_rate >= 0),
  price_label_override text,
  price_note text,
  features text[] not null default '{}',
  active boolean not null default true,
  public_visible boolean not null default false,
  featured boolean not null default false,
  sort_order integer not null default 100,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.services (slug, name, badge, description, pricing_model, base_price, percentage_rate, price_note, features, public_visible, featured, sort_order)
values
  ('analise-inicial', 'Análise inicial', 'Entrada', 'Primeira leitura técnica para entender o produto, o problema e se há espaço para diagnóstico ou suporte.', 'fixed', 129, null, 'Triagem paga, objetiva e sem venda de produto financeiro.', array['Leitura inicial do caso e dos documentos principais.', 'Indicação do nível de complexidade e próximos passos possíveis.', 'Sem recomendação de compra de novos ativos.'], true, true, 10),
  ('segunda-opiniao', 'Revisão técnica', 'Segunda opinião', 'Conversa e leitura crítica antes de assinar uma lâmina, aceitar uma proposta ou manter um produto complexo.', 'hybrid', 300, 0.1, '0,1% calculado sobre a carteira ou valor analisado no escopo combinado.', array['Checklist de riscos, custos e perguntas para banco ou corretora.', 'Comparação educacional de cenários e premissas.', 'Registro dos pontos que precisam de confirmação documental.'], true, false, 20),
  ('suporte-de-caso', 'Suporte de caso', 'Caso assistido', 'Acompanhamento operacional em FGC, negociação, documentação ou recuperação de valor.', 'custom', null, null, 'Valor variável conforme urgência, documentação, instituição e objetivo.', array['Organização de documentos e linha do tempo.', 'Apoio técnico para conversas com instituições.', 'Integração com advogado quando necessário.'], true, false, 30);

alter table public.cases add column service_id uuid references public.services(id);

update public.cases
set service_id = service_map.id
from (
  select id, slug from public.services
) service_map
where service_map.slug = case
  when public.cases.case_type = 'analise_inicial' then 'analise-inicial'
  when public.cases.case_type = 'segunda_opiniao' then 'segunda-opiniao'
  else 'suporte-de-caso'
end;

alter table public.payments
  add column service_id uuid references public.services(id),
  add column description text,
  add column fee_amount numeric(12,2) not null default 0 check (fee_amount >= 0),
  add column net_amount numeric(12,2) check (net_amount is null or net_amount >= 0),
  add column provider text,
  add column external_reference text,
  add column payment_url text,
  add column installment_count smallint check (installment_count is null or installment_count between 1 and 24),
  add column issued_at timestamptz,
  add column created_by uuid references public.profiles(id),
  add column metadata jsonb not null default '{}';

update public.payments payment
set service_id = case_row.service_id,
    description = coalesce(payment.notes, 'Cobrança de serviço'),
    net_amount = payment.amount
from public.cases case_row
where case_row.id = payment.case_id;

create index services_public_idx on public.services(active, public_visible, sort_order);
create index payments_status_due_idx on public.payments(status, due_date);
create index payments_paid_at_idx on public.payments(paid_at desc);
create index payments_service_idx on public.payments(service_id);

alter table public.services enable row level security;

create policy public_services_read on public.services
for select to anon
using (active = true and public_visible = true);

create policy staff_services_read on public.services
for select to authenticated
using (public.is_active_staff());

create policy staff_services_insert on public.services
for insert to authenticated
with check (public.is_active_staff());

create policy staff_services_update on public.services
for update to authenticated
using (public.is_active_staff())
with check (public.is_active_staff());

grant select on public.services to anon;
grant select, insert, update on public.services to authenticated;
grant all privileges on public.services to service_role;
