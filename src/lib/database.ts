import { supabase } from './supabase';
import type { 
  Lead, Client, Quotation, Order, Product, 
  Service, Task, User, CalendarEvent, Contact, 
  Project, Enquiry 
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
