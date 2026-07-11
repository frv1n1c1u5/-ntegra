create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    'active'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create policy staff_activities_insert on public.activities
  for insert to authenticated
  with check (public.is_active_staff() and actor_id = auth.uid());

-- Creates profiles for users invited before this migration was applied.
insert into public.profiles (id, full_name, email, status)
select id, coalesce(raw_user_meta_data ->> 'full_name', split_part(email, '@', 1)), email, 'active'
from auth.users
where email is not null
on conflict (id) do nothing;

