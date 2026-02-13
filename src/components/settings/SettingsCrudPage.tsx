import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export type SettingsFieldType = "text" | "textarea" | "number" | "select" | "toggle" | "color";

export interface SettingsFieldOption {
  label: string;
  value: string;
}

export interface SettingsFieldConfig<T> {
  key: keyof T & string;
  label: string;
  type?: SettingsFieldType;
  placeholder?: string;
  required?: boolean;
  options?: SettingsFieldOption[];
  parse?: (value: unknown) => unknown;
}

export interface SettingsColumnConfig<T> {
  key: keyof T & string;
  label: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface SettingsCrudPageProps<T extends { id: number }> {
  title: string;
  description?: string;
  breadcrumb?: { label: string; path?: string }[];
  createLabel?: string;
  searchKeys: (keyof T & string)[];
  defaultValues: Partial<T>;
  fields: SettingsFieldConfig<T>[];
  columns: SettingsColumnConfig<T>[];
  useList: () => { data?: T[]; isLoading: boolean };
  useCreate: () => { mutateAsync: (payload: Partial<T>) => Promise<unknown>; isPending: boolean };
  useUpdate: () => { mutateAsync: (payload: { id: number; data: Partial<T> }) => Promise<unknown>; isPending: boolean };
  useDelete: () => { mutateAsync: (id: number) => Promise<unknown>; isPending?: boolean };
}

const getStringValue = (value: unknown) => {
  if (value === null || value === undefined) return "";
  return String(value);
};

export function SettingsCrudPage<T extends { id: number }>({
  title,
  description,
  breadcrumb,
  createLabel = "Add",
  searchKeys,
  defaultValues,
  fields,
  columns,
  useList,
  useCreate,
  useUpdate,
  useDelete,
}: SettingsCrudPageProps<T>) {
  const { data, isLoading } = useList();
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const deleteMutation = useDelete();

  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>(defaultValues as Record<string, unknown>);

  const filteredItems = useMemo(() => {
    const items = data ?? [];
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      searchKeys.some((key) => getStringValue(item[key]).toLowerCase().includes(term))
    );
  }, [data, search, searchKeys]);

  const resetForm = () => {
    setFormData(defaultValues as Record<string, unknown>);
  };

  const normalizePayload = () => {
    const payload: Record<string, unknown> = {};
    fields.forEach((field) => {
      const raw = formData[field.key];
      let value: unknown = raw;
      if (field.type === "number") {
        value = raw === "" || raw === undefined ? undefined : Number(raw);
      }
      if (field.type === "toggle") {
        value = Boolean(raw);
      }
      if (field.parse) {
        value = field.parse(value);
      }
      payload[field.key] = value;
    });
    return payload as Partial<T>;
  };

  const validateRequired = () => {
    const missing = fields.find((field) => field.required && !getStringValue(formData[field.key]).trim());
    if (missing) {
      toast.error(`${missing.label} is required`);
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateRequired()) return;
    try {
      await createMutation.mutateAsync(normalizePayload());
      toast.success(`${title} item created`);
      setIsCreateOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.message || "Failed to create item");
    }
  };

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setFormData(item as Record<string, unknown>);
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;
    if (!validateRequired()) return;
    try {
      await updateMutation.mutateAsync({ id: selectedItem.id, data: normalizePayload() });
      toast.success(`${title} item updated`);
      setIsEditOpen(false);
      setSelectedItem(null);
      resetForm();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update item");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Item deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete item");
    }
  };

  const renderField = (field: SettingsFieldConfig<T>) => {
    const value = formData[field.key];
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={getStringValue(value)}
            onChange={(event) => setFormData({ ...formData, [field.key]: event.target.value })}
            placeholder={field.placeholder}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={getStringValue(value)}
            onChange={(event) => setFormData({ ...formData, [field.key]: event.target.value })}
            placeholder={field.placeholder}
          />
        );
      case "select":
        return (
          <Select
            value={getStringValue(value)}
            onValueChange={(val) => setFormData({ ...formData, [field.key]: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "toggle":
        return (
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span className="text-sm text-muted-foreground">{field.label}</span>
            <Switch
              checked={Boolean(value)}
              onCheckedChange={(checked) => setFormData({ ...formData, [field.key]: checked })}
            />
          </div>
        );
      case "color":
        return (
          <Input
            type="color"
            value={getStringValue(value) || "#0ea5e9"}
            onChange={(event) => setFormData({ ...formData, [field.key]: event.target.value })}
          />
        );
      default:
        return (
          <Input
            value={getStringValue(value)}
            onChange={(event) => setFormData({ ...formData, [field.key]: event.target.value })}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <DashboardLayout title={title} breadcrumb={breadcrumb}>
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${title.toLowerCase()}...`}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                {createLabel}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col.key} className={col.className}>
                      {col.label}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="text-center py-8">
                      No entries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      {columns.map((col) => (
                        <TableCell key={col.key} className={col.className}>
                          {col.render ? col.render(item) : getStringValue(item[col.key]) || "—"}
                        </TableCell>
                      ))}
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-2">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{createLabel}</DialogTitle>
            <DialogDescription>Add a new entry to {title.toLowerCase()}.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2 space-y-2" : "space-y-2"}>
                {field.type !== "toggle" && (
                  <Label>
                    {field.label}
                    {field.required ? " *" : ""}
                  </Label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>Update this entry.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2 space-y-2" : "space-y-2"}>
                {field.type !== "toggle" && (
                  <Label>
                    {field.label}
                    {field.required ? " *" : ""}
                  </Label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export const statusBadge = (value?: string) => {
  const label = (value || "").toLowerCase();
  const styles: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    inactive: "bg-muted text-muted-foreground border-muted",
    draft: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  };
  return (
    <Badge variant="outline" className={styles[label] || "bg-muted text-muted-foreground border-muted"}>
      {value || "active"}
    </Badge>
  );
};
