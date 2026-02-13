import { supabase } from './supabase';
import type { 
  Lead, Client, Quotation, Order, Product, 
  Service, Task, User, CalendarEvent, Contact, 
  Project, Enquiry, Role, Workspace, Preference,
  LeadSource, LeadStatus, FieldGroup, CustomField,
  InspectionTemplate, InspectionChecklist,
  LocalizationLanguage, LocalizationCurrency, LocalizationDateFormat,
  CompanySettings
} from '@/types/database';

// Generic CRUD operations
async function getAll<T>(table: string) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as T[];
}

async function getById<T>(table: string, id: number) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as T;
}

async function create<T>(table: string, values: Partial<T>) {
  const { data, error } = await supabase
    .from(table)
    .insert(values)
    .select()
    .single();
  
  if (error) throw error;
  return data as T;
}

async function update<T>(table: string, id: number, values: Partial<T>) {
  const { data, error } = await supabase
    .from(table)
    .update(values)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as T;
}

async function remove(table: string, id: number) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Leads Service
export const leadsService = {
  getAll: () => getAll<Lead>('leads'),
  getById: (id: number) => getById<Lead>('leads', id),
  create: (lead: Partial<Lead>) => create<Lead>('leads', lead),
  update: (id: number, lead: Partial<Lead>) => update<Lead>('leads', id, lead),
  delete: (id: number) => remove('leads', id),
  getByStatus: async (status: string) => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Lead[];
  },
};

// Clients Service
export const clientsService = {
  getAll: () => getAll<Client>('clients'),
  getById: (id: number) => getById<Client>('clients', id),
  create: (client: Partial<Client>) => create<Client>('clients', client),
  update: (id: number, client: Partial<Client>) => update<Client>('clients', id, client),
  delete: (id: number) => remove('clients', id),
};

// Quotations Service
export const quotationsService = {
  getAll: () => getAll<Quotation>('quotations'),
  getById: (id: number) => getById<Quotation>('quotations', id),
  create: (quotation: Partial<Quotation>) => create<Quotation>('quotations', quotation),
  update: (id: number, quotation: Partial<Quotation>) => update<Quotation>('quotations', id, quotation),
  delete: (id: number) => remove('quotations', id),
  getByClient: async (clientId: number) => {
    const { data, error } = await supabase
      .from('quotations')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Quotation[];
  },
  getByStatus: async (status: string) => {
    const { data, error } = await supabase
      .from('quotations')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Quotation[];
  },
};

// Orders Service
export const ordersService = {
  getAll: () => getAll<Order>('orders'),
  getById: (id: number) => getById<Order>('orders', id),
  create: (order: Partial<Order>) => create<Order>('orders', order),
  update: (id: number, order: Partial<Order>) => update<Order>('orders', id, order),
  delete: (id: number) => remove('orders', id),
  getByClient: async (clientId: number) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Order[];
  },
  getByStatus: async (status: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Order[];
  },
};

// Products Service
export const productsService = {
  getAll: () => getAll<Product>('products'),
  getById: (id: number) => getById<Product>('products', id),
  create: (product: Partial<Product>) => create<Product>('products', product),
  update: (id: number, product: Partial<Product>) => update<Product>('products', id, product),
  delete: (id: number) => remove('products', id),
  getByCategory: async (category: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('name', { ascending: true });
    if (error) throw error;
    return data as Product[];
  },
  getLowStock: async (threshold: number = 10) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .lte('stock_quantity', threshold)
      .order('stock_quantity', { ascending: true });
    if (error) throw error;
    return data as Product[];
  },
};

// Services Service
export const servicesService = {
  getAll: () => getAll<Service>('services'),
  getById: (id: number) => getById<Service>('services', id),
  create: (service: Partial<Service>) => create<Service>('services', service),
  update: (id: number, service: Partial<Service>) => update<Service>('services', id, service),
  delete: (id: number) => remove('services', id),
};

// Tasks Service
export const tasksService = {
  getAll: () => getAll<Task>('tasks'),
  getById: (id: number) => getById<Task>('tasks', id),
  create: (task: Partial<Task>) => create<Task>('tasks', task),
  update: (id: number, task: Partial<Task>) => update<Task>('tasks', id, task),
  delete: (id: number) => remove('tasks', id),
  getByAssignee: async (userId: number) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('assigned_to', userId)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data as Task[];
  },
  getByStatus: async (status: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('status', status)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data as Task[];
  },
  getUpcoming: async (days: number = 7) => {
    const today = new Date().toISOString();
    const future = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .gte('due_date', today)
      .lte('due_date', future)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data as Task[];
  },
};

// Users Service
export const usersService = {
  getAll: () => getAll<User>('users'),
  getById: (id: number) => getById<User>('users', id),
  create: (user: Partial<User>) => create<User>('users', user),
  update: (id: number, user: Partial<User>) => update<User>('users', id, user),
  delete: (id: number) => remove('users', id),
  getByRole: async (role: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', role)
      .order('name', { ascending: true });
    if (error) throw error;
    return data as User[];
  },
};

// Calendar Events Service
export const calendarEventsService = {
  getAll: () => getAll<CalendarEvent>('calendar_events'),
  getById: (id: number) => getById<CalendarEvent>('calendar_events', id),
  create: (event: Partial<CalendarEvent>) => create<CalendarEvent>('calendar_events', event),
  update: (id: number, event: Partial<CalendarEvent>) => update<CalendarEvent>('calendar_events', id, event),
  delete: (id: number) => remove('calendar_events', id),
  getByDateRange: async (startDate: string, endDate: string) => {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .gte('start_date', startDate)
      .lte('end_date', endDate)
      .order('start_date', { ascending: true });
    if (error) throw error;
    return data as CalendarEvent[];
  },
};

// Contacts Service
export const contactsService = {
  getAll: () => getAll<Contact>('contacts'),
  getById: (id: number) => getById<Contact>('contacts', id),
  create: (contact: Partial<Contact>) => create<Contact>('contacts', contact),
  update: (id: number, contact: Partial<Contact>) => update<Contact>('contacts', id, contact),
  delete: (id: number) => remove('contacts', id),
  getByClient: async (clientId: number) => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Contact[];
  },
};

// Projects Service
export const projectsService = {
  getAll: () => getAll<Project>('projects'),
  getById: (id: number) => getById<Project>('projects', id),
  create: (project: Partial<Project>) => create<Project>('projects', project),
  update: (id: number, project: Partial<Project>) => update<Project>('projects', id, project),
  delete: (id: number) => remove('projects', id),
  getByClient: async (clientId: number) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Project[];
  },
  getByStatus: async (status: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Project[];
  },
};

// Enquiries Service
export const enquiriesService = {
  getAll: () => getAll<Enquiry>('enquiries'),
  getById: (id: number) => getById<Enquiry>('enquiries', id),
  create: (enquiry: Partial<Enquiry>) => create<Enquiry>('enquiries', enquiry),
  update: (id: number, enquiry: Partial<Enquiry>) => update<Enquiry>('enquiries', id, enquiry),
  delete: (id: number) => remove('enquiries', id),
  getByStatus: async (status: string) => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Enquiry[];
  },
};

// Settings Services
export const rolesService = {
  getAll: () => getAll<Role>('roles'),
  getById: (id: number) => getById<Role>('roles', id),
  create: (role: Partial<Role>) => create<Role>('roles', role),
  update: (id: number, role: Partial<Role>) => update<Role>('roles', id, role),
  delete: (id: number) => remove('roles', id),
};

export const workspacesService = {
  getAll: () => getAll<Workspace>('workspaces'),
  getById: (id: number) => getById<Workspace>('workspaces', id),
  create: (workspace: Partial<Workspace>) => create<Workspace>('workspaces', workspace),
  update: (id: number, workspace: Partial<Workspace>) => update<Workspace>('workspaces', id, workspace),
  delete: (id: number) => remove('workspaces', id),
};

export const preferencesService = {
  getAll: () => getAll<Preference>('preferences'),
  getById: (id: number) => getById<Preference>('preferences', id),
  create: (preference: Partial<Preference>) => create<Preference>('preferences', preference),
  update: (id: number, preference: Partial<Preference>) => update<Preference>('preferences', id, preference),
  delete: (id: number) => remove('preferences', id),
};

export const leadSourcesService = {
  getAll: () => getAll<LeadSource>('lead_sources'),
  getById: (id: number) => getById<LeadSource>('lead_sources', id),
  create: (source: Partial<LeadSource>) => create<LeadSource>('lead_sources', source),
  update: (id: number, source: Partial<LeadSource>) => update<LeadSource>('lead_sources', id, source),
  delete: (id: number) => remove('lead_sources', id),
};

export const leadStatusesService = {
  getAll: () => getAll<LeadStatus>('lead_statuses'),
  getById: (id: number) => getById<LeadStatus>('lead_statuses', id),
  create: (status: Partial<LeadStatus>) => create<LeadStatus>('lead_statuses', status),
  update: (id: number, status: Partial<LeadStatus>) => update<LeadStatus>('lead_statuses', id, status),
  delete: (id: number) => remove('lead_statuses', id),
};

export const fieldGroupsService = {
  getAll: () => getAll<FieldGroup>('field_groups'),
  getById: (id: number) => getById<FieldGroup>('field_groups', id),
  create: (group: Partial<FieldGroup>) => create<FieldGroup>('field_groups', group),
  update: (id: number, group: Partial<FieldGroup>) => update<FieldGroup>('field_groups', id, group),
  delete: (id: number) => remove('field_groups', id),
};

export const customFieldsService = {
  getAll: () => getAll<CustomField>('custom_fields'),
  getById: (id: number) => getById<CustomField>('custom_fields', id),
  create: (field: Partial<CustomField>) => create<CustomField>('custom_fields', field),
  update: (id: number, field: Partial<CustomField>) => update<CustomField>('custom_fields', id, field),
  delete: (id: number) => remove('custom_fields', id),
};

export const inspectionTemplatesService = {
  getAll: () => getAll<InspectionTemplate>('inspection_templates'),
  getById: (id: number) => getById<InspectionTemplate>('inspection_templates', id),
  create: (template: Partial<InspectionTemplate>) => create<InspectionTemplate>('inspection_templates', template),
  update: (id: number, template: Partial<InspectionTemplate>) => update<InspectionTemplate>('inspection_templates', id, template),
  delete: (id: number) => remove('inspection_templates', id),
};

export const inspectionChecklistsService = {
  getAll: () => getAll<InspectionChecklist>('inspection_checklists'),
  getById: (id: number) => getById<InspectionChecklist>('inspection_checklists', id),
  create: (checklist: Partial<InspectionChecklist>) => create<InspectionChecklist>('inspection_checklists', checklist),
  update: (id: number, checklist: Partial<InspectionChecklist>) => update<InspectionChecklist>('inspection_checklists', id, checklist),
  delete: (id: number) => remove('inspection_checklists', id),
};

export const localizationLanguagesService = {
  getAll: () => getAll<LocalizationLanguage>('localization_languages'),
  getById: (id: number) => getById<LocalizationLanguage>('localization_languages', id),
  create: (language: Partial<LocalizationLanguage>) => create<LocalizationLanguage>('localization_languages', language),
  update: (id: number, language: Partial<LocalizationLanguage>) => update<LocalizationLanguage>('localization_languages', id, language),
  delete: (id: number) => remove('localization_languages', id),
};

export const localizationCurrenciesService = {
  getAll: () => getAll<LocalizationCurrency>('localization_currencies'),
  getById: (id: number) => getById<LocalizationCurrency>('localization_currencies', id),
  create: (currency: Partial<LocalizationCurrency>) => create<LocalizationCurrency>('localization_currencies', currency),
  update: (id: number, currency: Partial<LocalizationCurrency>) => update<LocalizationCurrency>('localization_currencies', id, currency),
  delete: (id: number) => remove('localization_currencies', id),
};

export const localizationDateFormatsService = {
  getAll: () => getAll<LocalizationDateFormat>('localization_date_formats'),
  getById: (id: number) => getById<LocalizationDateFormat>('localization_date_formats', id),
  create: (dateFormat: Partial<LocalizationDateFormat>) => create<LocalizationDateFormat>('localization_date_formats', dateFormat),
  update: (id: number, dateFormat: Partial<LocalizationDateFormat>) => update<LocalizationDateFormat>('localization_date_formats', id, dateFormat),
  delete: (id: number) => remove('localization_date_formats', id),
};

// Company Settings Service
export const companySettingsService = {
  getSettings: async () => {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .limit(1)
      .single();
    if (error) throw error;
    return data as CompanySettings;
  },
  updateSettings: async (settings: Partial<CompanySettings>) => {
    // Always update the first (and only) record
    const { data: existing } = await supabase
      .from('company_settings')
      .select('id')
      .limit(1)
      .single();
    
    if (existing) {
      const { data, error } = await supabase
        .from('company_settings')
        .update(settings)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as CompanySettings;
    } else {
      const { data, error } = await supabase
        .from('company_settings')
        .insert(settings)
        .select()
        .single();
      if (error) throw error;
      return data as CompanySettings;
    }
  },
};
