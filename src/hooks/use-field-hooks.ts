// Field hooks for all field types
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fieldPositionsService, fieldDepartmentsService, fieldIndustriesService,
  fieldPumpTypesService, fieldManufacturersService, fieldUnitsService,
  fieldPumpModelsService
} from "@/lib/database";
import type { 
  FieldPosition, FieldDepartment, FieldIndustry, FieldPumpType,
  FieldManufacturer, FieldUnit, FieldPumpModel
} from "@/types/database";

// Position hooks
export function useFieldPositions() {
  return useQuery({
    queryKey: ['field_positions'],
    queryFn: () => fieldPositionsService.getAll(),
  });
}

export function useFieldPosition(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['field_positions', id],
    queryFn: () => fieldPositionsService.getById(id),
    enabled: options?.enabled ?? true,
  });
}

export function useCreateFieldPosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FieldPosition>) => fieldPositionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_positions'] });
    },
  });
}

export function useUpdateFieldPosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldPosition> }) =>
      fieldPositionsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_positions'] });
    },
  });
}

export function useDeleteFieldPosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldPositionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_positions'] });
    },
  });
}

// Department hooks
export function useFieldDepartments() {
  return useQuery({
    queryKey: ['field_departments'],
    queryFn: () => fieldDepartmentsService.getAll(),
  });
}

export function useFieldDepartment(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['field_departments', id],
    queryFn: () => fieldDepartmentsService.getById(id),
    enabled: options?.enabled ?? true,
  });
}

export function useCreateFieldDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FieldDepartment>) => fieldDepartmentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_departments'] });
    },
  });
}

export function useUpdateFieldDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldDepartment> }) =>
      fieldDepartmentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_departments'] });
    },
  });
}

export function useDeleteFieldDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldDepartmentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_departments'] });
    },
  });
}

// Industry hooks
export function useFieldIndustries() {
  return useQuery({
    queryKey: ['field_industries'],
    queryFn: () => fieldIndustriesService.getAll(),
  });
}

export function useFieldIndustry(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['field_industries', id],
    queryFn: () => fieldIndustriesService.getById(id),
    enabled: options?.enabled ?? true,
  });
}

export function useCreateFieldIndustry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FieldIndustry>) => fieldIndustriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_industries'] });
    },
  });
}

export function useUpdateFieldIndustry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldIndustry> }) =>
      fieldIndustriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_industries'] });
    },
  });
}

export function useDeleteFieldIndustry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldIndustriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_industries'] });
    },
  });
}

// Pump Type hooks
export function useFieldPumpTypes() {
  return useQuery({
    queryKey: ['field_pump_types'],
    queryFn: () => fieldPumpTypesService.getAll(),
  });
}

export function useFieldPumpType(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['field_pump_types', id],
    queryFn: () => fieldPumpTypesService.getById(id),
    enabled: options?.enabled ?? true,
  });
}

export function useCreateFieldPumpType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FieldPumpType>) => fieldPumpTypesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_pump_types'] });
    },
  });
}

export function useUpdateFieldPumpType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldPumpType> }) =>
      fieldPumpTypesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_pump_types'] });
    },
  });
}

export function useDeleteFieldPumpType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldPumpTypesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_pump_types'] });
    },
  });
}

// Manufacturer hooks
export function useFieldManufacturers() {
  return useQuery({
    queryKey: ['field_manufacturers'],
    queryFn: () => fieldManufacturersService.getAll(),
  });
}

export function useFieldManufacturer(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['field_manufacturers', id],
    queryFn: () => fieldManufacturersService.getById(id),
    enabled: options?.enabled ?? true,
  });
}

export function useCreateFieldManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FieldManufacturer>) => fieldManufacturersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_manufacturers'] });
    },
  });
}

export function useUpdateFieldManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldManufacturer> }) =>
      fieldManufacturersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_manufacturers'] });
    },
  });
}

export function useDeleteFieldManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldManufacturersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_manufacturers'] });
    },
  });
}

// Unit hooks
export function useFieldUnits() {
  return useQuery({
    queryKey: ['field_units'],
    queryFn: () => fieldUnitsService.getAll(),
  });
}

export function useFieldUnit(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['field_units', id],
    queryFn: () => fieldUnitsService.getById(id),
    enabled: options?.enabled ?? true,
  });
}

export function useCreateFieldUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FieldUnit>) => fieldUnitsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_units'] });
    },
  });
}

export function useUpdateFieldUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldUnit> }) =>
      fieldUnitsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_units'] });
    },
  });
}

export function useDeleteFieldUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldUnitsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_units'] });
    },
  });
}

// Pump Model hooks
export function useFieldPumpModels() {
  return useQuery({
    queryKey: ['field_pump_models'],
    queryFn: () => fieldPumpModelsService.getAll(),
  });
}

export function useFieldPumpModel(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['field_pump_models', id],
    queryFn: () => fieldPumpModelsService.getById(id),
    enabled: options?.enabled ?? true,
  });
}

export function useCreateFieldPumpModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FieldPumpModel>) => fieldPumpModelsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_pump_models'] });
    },
  });
}

export function useUpdateFieldPumpModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FieldPumpModel> }) =>
      fieldPumpModelsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_pump_models'] });
    },
  });
}

export function useDeleteFieldPumpModel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fieldPumpModelsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field_pump_models'] });
    },
  });
}
