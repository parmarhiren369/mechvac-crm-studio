-- Pump Models table for managing pump model catalogs
create table if not exists pump_models (
  id bigserial primary key,
  oem_id bigint references field_manufacturers(id) on delete cascade,
  pump_type_id bigint references field_pump_types(id) on delete cascade,
  model_no text not null,
  model_qty integer default 1,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for faster queries
create index if not exists idx_pump_models_oem on pump_models(oem_id);
create index if not exists idx_pump_models_pump_type on pump_models(pump_type_id);
