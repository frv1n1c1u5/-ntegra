-- Execute only in a non-production environment after inviting the staff users.
insert into public.leads (name, phone, normalized_phone, email, institution, issue_type, amount_range, urgency, notes, consent_at)
values
  ('Cliente Demonstração', '(51) 99999-0000', '51999990000', 'cliente@example.com', 'Banco Exemplo', 'COE ou produto estruturado', 'R$ 100 mil a R$ 500 mil', 'Quero revisar com calma', 'Lead fictício para validar o funil.', now()),
  ('Investidora Teste', '(11) 98888-0000', '11988880000', 'investidora@example.com', 'Corretora Exemplo', 'Segunda opinião antes de assinar', 'Até R$ 100 mil', 'Preciso decidir nesta semana', 'Lead fictício. Não usar em produção.', now());

