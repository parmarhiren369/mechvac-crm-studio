-- Localization tables for Countries, States, and Cities

create table if not exists countries (
  id bigserial primary key,
  name text not null unique,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists states (
  id bigserial primary key,
  country_id bigint references countries(id) on delete cascade,
  name text not null,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists cities (
  id bigserial primary key,
  state_id bigint references states(id) on delete cascade,
  name text not null,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes for better performance
create index if not exists idx_states_country_id on states(country_id);
create index if not exists idx_cities_state_id on cities(state_id);
