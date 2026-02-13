// Database Types - Auto-generated from Supabase schema

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>;
      };
      clients: {
        Row: Client;
        Insert: Omit<Client, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Client, 'id' | 'created_at'>>;
      };
      quotations: {
        Row: Quotation;
        Insert: Omit<Quotation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Quotation, 'id' | 'created_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at'>>;
      };
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      calendar_events: {
        Row: CalendarEvent;
        Insert: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CalendarEvent, 'id' | 'created_at'>>;
      };
      contacts: {
        Row: Contact;
        Insert: Omit<Contact, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Contact, 'id' | 'created_at'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at'>>;
      };
      enquiries: {
        Row: Enquiry;
        Insert: Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Enquiry, 'id' | 'created_at'>>;
      };
      roles: {
        Row: Role;
        Insert: Omit<Role, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Role, 'id' | 'created_at'>>;
      };
      workspaces: {
        Row: Workspace;
        Insert: Omit<Workspace, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Workspace, 'id' | 'created_at'>>;
      };
      preferences: {
        Row: Preference;
        Insert: Omit<Preference, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Preference, 'id' | 'created_at'>>;
      };
      lead_sources: {
        Row: LeadSource;
        Insert: Omit<LeadSource, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LeadSource, 'id' | 'created_at'>>;
      };
      lead_statuses: {
        Row: LeadStatus;
        Insert: Omit<LeadStatus, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LeadStatus, 'id' | 'created_at'>>;
      };
      field_groups: {
        Row: FieldGroup;
        Insert: Omit<FieldGroup, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FieldGroup, 'id' | 'created_at'>>;
      };
      custom_fields: {
        Row: CustomField;
        Insert: Omit<CustomField, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CustomField, 'id' | 'created_at'>>;
      };
      inspection_templates: {
        Row: InspectionTemplate;
        Insert: Omit<InspectionTemplate, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<InspectionTemplate, 'id' | 'created_at'>>;
      };
      inspection_checklists: {
        Row: InspectionChecklist;
        Insert: Omit<InspectionChecklist, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<InspectionChecklist, 'id' | 'created_at'>>;
      };
      localization_languages: {
        Row: LocalizationLanguage;
        Insert: Omit<LocalizationLanguage, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LocalizationLanguage, 'id' | 'created_at'>>;
      };
      localization_currencies: {
        Row: LocalizationCurrency;
        Insert: Omit<LocalizationCurrency, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LocalizationCurrency, 'id' | 'created_at'>>;
      };
      localization_date_formats: {
        Row: LocalizationDateFormat;
        Insert: Omit<LocalizationDateFormat, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LocalizationDateFormat, 'id' | 'created_at'>>;
      };
      company_settings: {
        Row: CompanySettings;
        Insert: Omit<CompanySettings, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CompanySettings, 'id' | 'created_at'>>;
      };
    };
  };
}

// Entity Types
export interface Lead {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  status?: string;
  assigned_to?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company_name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Quotation {
  id: number;
  quotation_number?: string;
  client_id?: number;
  project_id?: number;
  subject?: string;
  description?: string;
  amount?: number;
  tax?: number;
  total_amount?: number;
  status?: string;
  valid_until?: string;
  issued_date?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: number;
  order_number?: string;
  client_id?: number;
  quotation_id?: number;
  project_id?: number;
  description?: string;
  amount?: number;
  tax?: number;
  total_amount?: number;
  status?: string;
  order_date?: string;
  delivery_date?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  name: string;
  sku?: string;
  description?: string;
  category?: string;
  price?: number;
  cost?: number;
  stock_quantity?: number;
  unit?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: number;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  duration?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  due_date?: string;
  assigned_to?: number;
  created_by?: number;
  project_id?: number;
  client_id?: number;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  department?: string;
  status?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  all_day?: boolean;
  location?: string;
  attendees?: number[];
  type?: string;
  status?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  position?: string;
  company_id?: number;
  client_id?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  client_id?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  project_manager?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Enquiry {
  id: number;
  subject: string;
  description?: string;
  client_id?: number;
  contact_id?: number;
  source?: string;
  status?: string;
  priority?: string;
  assigned_to?: number;
  created_at?: string;
  updated_at?: string;
}

export interface RolePermissions {
  role?: string[];
  lead?: string[];
  staff?: string[];
  services?: string[];
  quotation?: string[];
  order?: string[];
  product?: string[];
  company?: string[];
  task?: string[];
  calendar?: string[];
  report?: string[];
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions?: RolePermissions;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Workspace {
  id: number;
  name: string;
  slug?: string;
  image?: string;
  logo?: string;
  description?: string;
  footer?: string;
  timezone?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Preference {
  id: number;
  key: string;
  value?: string;
  description?: string;
  scope?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LeadSource {
  id: number;
  name: string;
  description?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LeadStatus {
  id: number;
  name: string;
  color?: string;
  stage_order?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FieldGroup {
  id: number;
  entity: string;
  name: string;
  description?: string;
  sort_order?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CustomField {
  id: number;
  entity: string;
  label: string;
  field_key: string;
  field_type: string;
  is_required?: boolean;
  options?: string;
  group_id?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface InspectionTemplate {
  id: number;
  name: string;
  description?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface InspectionChecklist {
  id: number;
  template_id?: number;
  title: string;
  items?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LocalizationLanguage {
  id: number;
  name: string;
  code: string;
  is_default?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LocalizationCurrency {
  id: number;
  name: string;
  code: string;
  symbol?: string;
  is_default?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LocalizationDateFormat {
  id: number;
  label: string;
  format: string;
  is_default?: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompanySettings {
  id: number;
  name?: string;
  about?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  province_state?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  company_logo_url?: string;
  company_logo_small_url?: string;
  company_icon_url?: string;
  created_at?: string;
  updated_at?: string;
}
