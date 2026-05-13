create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  price_min numeric(12, 2) not null default 0,
  price_label text not null,
  description text not null,
  story text not null default '',
  images jsonb not null default '[]'::jsonb,
  videos jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('active', 'draft')),
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  price_label text not null,
  description text not null,
  turnaround text not null default '',
  features text[] not null default '{}',
  image_url text not null default '',
  icon_name text not null default 'Sparkles',
  status text not null default 'draft' check (status in ('active', 'draft')),
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null default '',
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  src text not null,
  thumbnail text,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('active', 'draft')),
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  order_type text,
  payment_preference text,
  budget text,
  timeline text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_status_sort_idx on public.products(status, sort_order);
create index if not exists services_status_sort_idx on public.services(status, sort_order);
create index if not exists gallery_status_sort_idx on public.gallery_items(status, sort_order);
create index if not exists order_inquiries_status_created_idx on public.order_inquiries(status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at
before update on public.gallery_items
for each row execute function public.set_updated_at();

drop trigger if exists order_inquiries_set_updated_at on public.order_inquiries;
create trigger order_inquiries_set_updated_at
before update on public.order_inquiries
for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.gallery_items enable row level security;
alter table public.order_inquiries enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
  );
$$;

drop policy if exists "Users can read own admin profile" on public.admin_profiles;
create policy "Users can read own admin profile"
on public.admin_profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active services" on public.services;
create policy "Public can read active services"
on public.services
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Admins can manage services" on public.services;
create policy "Admins can manage services"
on public.services
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active gallery items" on public.gallery_items;
create policy "Public can read active gallery items"
on public.gallery_items
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Admins can manage gallery items" on public.gallery_items;
create policy "Admins can manage gallery items"
on public.gallery_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can create inquiries" on public.order_inquiries;
create policy "Anyone can create inquiries"
on public.order_inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can manage inquiries" on public.order_inquiries;
create policy "Admins can manage inquiries"
on public.order_inquiries
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.products, public.services, public.gallery_items to anon, authenticated;
grant insert on public.order_inquiries to anon, authenticated;
grant all on public.admin_profiles, public.products, public.services, public.gallery_items, public.order_inquiries to authenticated;

-- After creating your first Supabase Auth user, run this with that user's UUID:
-- insert into public.admin_profiles (user_id, display_name)
-- values ('00000000-0000-0000-0000-000000000000', 'Chitwan Embroidery Admin');
