import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, CheckCircle2, AlertTriangle, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServices, useCreateService, useDeleteService } from "@/hooks/use-database";
import { toast } from "sonner";

const getStatusColor = (status?: string) => {
  switch ((status || "").toLowerCase()) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "in progress":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    default:
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  }
};

const ServicesPage = () => {
  const { data: services, isLoading } = useServices();
  const createService = useCreateService();
  const deleteService = useDeleteService();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    status: "pending",
  });

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    try {
      await createService.mutateAsync({
        name: formData.name.trim(),
        description: formData.description || undefined,
        category: formData.category || undefined,
        price: formData.price ? Number(formData.price) : undefined,
        duration: formData.duration ? Number(formData.duration) : undefined,
        status: formData.status,
      });
      toast.success("Service created");
      setIsCreateOpen(false);
      setFormData({ name: "", description: "", category: "", price: "", duration: "", status: "pending" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to create service");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService.mutateAsync(id);
      toast.success("Service deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete service");
    }
  };

  return (
    <DashboardLayout title="Services">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Service Requests</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4" /> New Request
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6">Loading...</TableCell></TableRow>
              ) : (services ?? []).length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6">No services yet.</TableCell></TableRow>
              ) : (
                (services ?? []).map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.category || "—"}</TableCell>
                    <TableCell>
                      {(service.price ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell>{service.duration ? `${service.duration} min` : "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(service.status)}>
                        {service.status || "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Service Request</DialogTitle>
            <DialogDescription>Create a service request record.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createService.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ServicesPage;
