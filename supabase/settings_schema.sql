-- Settings tables for CRM

create table if not exists roles (
  id bigserial primary key,
  name text not null,
  description text,
  permissions jsonb default '{}'::jsonb,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists workspaces (
  id bigserial primary key,
  name text not null,
  slug text,
  image text,
  logo text,
  description text,
  footer text,
  timezone text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists preferences (
  id bigserial primary key,
  key text not null,
  value text,
  description text,
  scope text default 'app',
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists lead_sources (
  id bigserial primary key,
  name text not null,
  description text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists lead_statuses (
  id bigserial primary key,
  name text not null,
  color text,
  stage_order integer,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists field_groups (
  id bigserial primary key,
  entity text not null,
  name text not null,
  description text,
  sort_order integer,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists custom_fields (
  id bigserial primary key,
  entity text not null,
  label text not null,
  field_key text not null,
  field_type text not null,
  is_required boolean default false,
  options text,
  group_id bigint references field_groups(id),
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists inspection_templates (
  id bigserial primary key,
  name text not null,
  description text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists inspection_checklists (
  id bigserial primary key,
  template_id bigint references inspection_templates(id),
  title text not null,
  items text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists localization_languages (
  id bigserial primary key,
  name text not null,
  code text not null,
  is_default boolean default false,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists localization_currencies (
  id bigserial primary key,
  name text not null,
  code text not null,
  symbol text,
  is_default boolean default false,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists localization_date_formats (
  id bigserial primary key,
  label text not null,
  format text not null,
  is_default boolean default false,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
