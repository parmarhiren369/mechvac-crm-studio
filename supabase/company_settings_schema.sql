-- Company settings table for App Settings page

create table if not exists company_settings (
  id bigserial primary key,
  name text,
  about text,
  email text,
  phone text,
  address text,
  city text,
  zip_code text,
  province_state text,
  linkedin_url text,
  twitter_url text,
  facebook_url text,
  instagram_url text,
  company_logo_url text,
  company_logo_small_url text,
  company_icon_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Insert default record if none exists
insert into company_settings (name) 
select 'Mechvac Technologies'
where not exists (select 1 from company_settings limit 1);
