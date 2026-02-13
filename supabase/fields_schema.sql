-- Field tables for CRM

create table if not exists field_positions (
  id bigserial primary key,
  name text not null,
  value text,
  sort_order integer,
  color text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists field_departments (
  id bigserial primary key,
  name text not null,
  value text,
  sort_order integer,
  color text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists field_industries (
  id bigserial primary key,
  name text not null,
  value text,
  sort_order integer,
  color text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists field_pump_types (
  id bigserial primary key,
  name text not null,
  value text,
  sort_order integer,
  color text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists field_manufacturers (
  id bigserial primary key,
  name text not null,
  value text,
  sort_order integer,
  color text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists field_units (
  id bigserial primary key,
  name text not null,
  value text,
  sort_order integer,
  color text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists field_pump_models (
  id bigserial primary key,
  name text not null,
  value text,
  sort_order integer,
  color text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
