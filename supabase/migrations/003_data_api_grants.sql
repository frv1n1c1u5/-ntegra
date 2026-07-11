grant usage on schema public to authenticated, service_role;

grant select, insert, update, delete on table
  public.profiles,
  public.leads,
  public.clients,
  public.cases,
  public.case_notes,
  public.tasks,
  public.documents,
  public.payments,
  public.activities
to authenticated;

grant all privileges on table
  public.profiles,
  public.leads,
  public.clients,
  public.cases,
  public.case_notes,
  public.tasks,
  public.documents,
  public.payments,
  public.activities
to service_role;

grant usage, select on all sequences in schema public to authenticated, service_role;
grant execute on function public.is_active_staff() to authenticated, service_role;

