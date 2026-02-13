import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  leadsService, clientsService, quotationsService, ordersService,
  productsService, servicesService, tasksService, usersService,
  calendarEventsService, contactsService, projectsService, enquiriesService,
  rolesService, workspacesService, preferencesService,
  leadSourcesService, leadStatusesService,
  fieldGroupsService, customFieldsService,
  inspectionTemplatesService, inspectionChecklistsService,
  localizationLanguagesService, localizationCurrenciesService, localizationDateFormatsService,
  companySettingsService
} from '@/lib/database';
import type { 
  Lead, Client, Quotation, Order, Product, Service, 
  Task, User, CalendarEvent, Contact, Project, Enquiry,
  Role, Workspace, Preference, LeadSource, LeadStatus,
  FieldGroup, CustomField, InspectionTemplate, InspectionChecklist,
  LocalizationLanguage, LocalizationCurrency, LocalizationDateFormat,
  CompanySettings
} from '@/types/database';

// Leads Hooks
export function useLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsService.getAll(),
  });
}

export function useLead(id: number) {
  return useQuery({
    queryKey: ['leads', id],
    queryFn: () => leadsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lead: Partial<Lead>) => leadsService.create(lead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Lead> }) => 
      leadsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => leadsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

// Clients Hooks
export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsService.getAll(),
  });
}

export function useClient(id: number) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => clientsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (client: Partial<Client>) => clientsService.create(client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Client> }) => 
      clientsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => clientsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

// Quotations Hooks
export function useQuotations() {
  return useQuery({
    queryKey: ['quotations'],
    queryFn: () => quotationsService.getAll(),
  });
}

export function useQuotation(id: number) {
  return useQuery({
    queryKey: ['quotations', id],
    queryFn: () => quotationsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateQuotation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quotation: Partial<Quotation>) => quotationsService.create(quotation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
    },
  });
}

export function useUpdateQuotation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Quotation> }) => 
      quotationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
    },
  });
}

export function useDeleteQuotation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => quotationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
    },
  });
}

// Orders Hooks
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersService.getAll(),
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: Partial<Order>) => ordersService.create(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Order> }) => 
      ordersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => ordersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// Products Hooks
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll(),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: Partial<Product>) => productsService.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) => 
      productsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Services Hooks
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => servicesService.getAll(),
  });
}

export function useService(id: number) {
  return useQuery({
    queryKey: ['services', id],
    queryFn: () => servicesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (service: Partial<Service>) => servicesService.create(service),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Service> }) => 
      servicesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => servicesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

// Tasks Hooks
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksService.getAll(),
  });
}

export function useTask(id: number) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => tasksService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Partial<Task>) => tasksService.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) => 
      tasksService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => tasksService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Users Hooks
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getAll(),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: Partial<User>) => usersService.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) => 
      usersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => usersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Calendar Events Hooks
export function useCalendarEvents() {
  return useQuery({
    queryKey: ['calendar_events'],
    queryFn: () => calendarEventsService.getAll(),
  });
}

export function useCalendarEvent(id: number) {
  return useQuery({
    queryKey: ['calendar_events', id],
    queryFn: () => calendarEventsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCalendarEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: Partial<CalendarEvent>) => calendarEventsService.create(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar_events'] });
    },
  });
}

export function useUpdateCalendarEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CalendarEvent> }) => 
      calendarEventsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar_events'] });
    },
  });
}

export function useDeleteCalendarEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => calendarEventsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar_events'] });
    },
  });
}

// Contacts Hooks
export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => contactsService.getAll(),
  });
}

export function useContact(id: number) {
  return useQuery({
    queryKey: ['contacts', id],
    queryFn: () => contactsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: Partial<Contact>) => contactsService.create(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Contact> }) => 
      contactsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => contactsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

// Projects Hooks
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsService.getAll(),
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: Partial<Project>) => projectsService.create(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) => 
      projectsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => projectsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Enquiries Hooks
export function useEnquiries() {
  return useQuery({
    queryKey: ['enquiries'],
    queryFn: () => enquiriesService.getAll(),
  });
}

export function useEnquiry(id: number) {
  return useQuery({
    queryKey: ['enquiries', id],
    queryFn: () => enquiriesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (enquiry: Partial<Enquiry>) => enquiriesService.create(enquiry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

export function useUpdateEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Enquiry> }) => 
      enquiriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => enquiriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

// Roles Hooks
export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => rolesService.getAll(),
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (role: Partial<Role>) => rolesService.create(role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Role> }) =>
      rolesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => rolesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

// Workspaces Hooks
export function useWorkspaces() {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: () => workspacesService.getAll(),
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspace: Partial<Workspace>) => workspacesService.create(workspace),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Workspace> }) =>
      workspacesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => workspacesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
}

// Preferences Hooks
export function usePreferences() {
  return useQuery({
    queryKey: ['preferences'],
    queryFn: () => preferencesService.getAll(),
  });
}

export function useCreatePreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (preference: Partial<Preference>) => preferencesService.create(preference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });
}

export function useUpdatePreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Preference> }) =>
      preferencesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });
}

export function useDeletePreference() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => preferencesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });
}

// Lead Sources Hooks
export function useLeadSources() {
  return useQuery({
    queryKey: ['lead_sources'],
    queryFn: () => leadSourcesService.getAll(),
  });
}

export function useCreateLeadSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (source: Partial<LeadSource>) => leadSourcesService.create(source),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead_sources'] });
    },
  });
}

export function useUpdateLeadSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LeadSource> }) =>
      leadSourcesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead_sources'] });
    },
  });
}

export function useDeleteLeadSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => leadSourcesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead_sources'] });
    },
  });
}

// Lead Statuses Hooks
export function useLeadStatuses() {
  return useQuery({
    queryKey: ['lead_statuses'],
    queryFn: () => leadStatusesService.getAll(),
  });
}

export function useCreateLeadStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: Partial<LeadStatus>) => leadStatusesService.create(status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead_statuses'] });
    },
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LeadStatus> }) =>
      leadStatusesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead_statuses'] });
    },
  });
}

export function useDeleteLeadStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => leadStatusesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead_statuses'] });
    },
  });
}

// Field Groups Hooks
export function useFieldGroups() {
  return useQuery({
    queryKey: ['field_groups'],
    queryFn: () => fieldGroupsService.getAll(),
  });
}

export function useCreateFieldGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (group: Partial<FieldGroup>) => fieldGroupsService.create(group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_groups'] });
    },
  });
}

export function useUpdateFieldGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldGroup> }) =>
      fieldGroupsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_groups'] });
    },
  });
}

export function useDeleteFieldGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldGroupsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_groups'] });
    },
  });
}

// Custom Fields Hooks
export function useCustomFields() {
  return useQuery({
    queryKey: ['custom_fields'],
    queryFn: () => customFieldsService.getAll(),
  });
}

export function useCreateCustomField() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (field: Partial<CustomField>) => customFieldsService.create(field),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom_fields'] });
    },
  });
}

export function useUpdateCustomField() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CustomField> }) =>
      customFieldsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom_fields'] });
    },
  });
}

export function useDeleteCustomField() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => customFieldsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom_fields'] });
    },
  });
}

// Inspection Templates Hooks
export function useInspectionTemplates() {
  return useQuery({
    queryKey: ['inspection_templates'],
    queryFn: () => inspectionTemplatesService.getAll(),
  });
}

export function useCreateInspectionTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (template: Partial<InspectionTemplate>) => inspectionTemplatesService.create(template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspection_templates'] });
    },
  });
}

export function useUpdateInspectionTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InspectionTemplate> }) =>
      inspectionTemplatesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspection_templates'] });
    },
  });
}

export function useDeleteInspectionTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => inspectionTemplatesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspection_templates'] });
    },
  });
}

// Inspection Checklists Hooks
export function useInspectionChecklists() {
  return useQuery({
    queryKey: ['inspection_checklists'],
    queryFn: () => inspectionChecklistsService.getAll(),
  });
}

export function useCreateInspectionChecklist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (checklist: Partial<InspectionChecklist>) => inspectionChecklistsService.create(checklist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspection_checklists'] });
    },
  });
}

export function useUpdateInspectionChecklist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InspectionChecklist> }) =>
      inspectionChecklistsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspection_checklists'] });
    },
  });
}

export function useDeleteInspectionChecklist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => inspectionChecklistsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspection_checklists'] });
    },
  });
}

// Localization Languages Hooks
export function useLocalizationLanguages() {
  return useQuery({
    queryKey: ['localization_languages'],
    queryFn: () => localizationLanguagesService.getAll(),
  });
}

export function useCreateLocalizationLanguage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (language: Partial<LocalizationLanguage>) => localizationLanguagesService.create(language),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_languages'] });
    },
  });
}

export function useUpdateLocalizationLanguage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LocalizationLanguage> }) =>
      localizationLanguagesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_languages'] });
    },
  });
}

export function useDeleteLocalizationLanguage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => localizationLanguagesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_languages'] });
    },
  });
}

// Localization Currencies Hooks
export function useLocalizationCurrencies() {
  return useQuery({
    queryKey: ['localization_currencies'],
    queryFn: () => localizationCurrenciesService.getAll(),
  });
}

export function useCreateLocalizationCurrency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (currency: Partial<LocalizationCurrency>) => localizationCurrenciesService.create(currency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_currencies'] });
    },
  });
}

export function useUpdateLocalizationCurrency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LocalizationCurrency> }) =>
      localizationCurrenciesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_currencies'] });
    },
  });
}

export function useDeleteLocalizationCurrency() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => localizationCurrenciesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_currencies'] });
    },
  });
}

// Localization Date Formats Hooks
export function useLocalizationDateFormats() {
  return useQuery({
    queryKey: ['localization_date_formats'],
    queryFn: () => localizationDateFormatsService.getAll(),
  });
}

export function useCreateLocalizationDateFormat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dateFormat: Partial<LocalizationDateFormat>) => localizationDateFormatsService.create(dateFormat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_date_formats'] });
    },
  });
}

export function useUpdateLocalizationDateFormat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<LocalizationDateFormat> }) =>
      localizationDateFormatsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_date_formats'] });
    },
  });
}

export function useDeleteLocalizationDateFormat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => localizationDateFormatsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['localization_date_formats'] });
    },
  });
}

// Company Settings Hooks
export function useCompanySettings() {
  return useQuery({
    queryKey: ['company_settings'],
    queryFn: () => companySettingsService.getSettings(),
  });
}

export function useUpdateCompanySettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: Partial<CompanySettings>) => companySettingsService.updateSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company_settings'] });
    },
  });
}
