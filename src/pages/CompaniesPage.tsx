import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useClients, useCreateClient, useDeleteClient } from "@/hooks/use-database";
import { toast } from "sonner";

const getStatusColor = (status?: string) => {
  switch ((status || "").toLowerCase()) {
    case "active":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "inactive":
      return "bg-muted text-muted-foreground border-muted";
    default:
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  }
};

const CompaniesPage = () => {
  const { data: clients, isLoading } = useClients();
  const createClient = useCreateClient();
  const deleteClient = useDeleteClient();

  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    website: "",
    status: "active",
  });

  const filtered = (clients ?? []).filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.company_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    try {
      await createClient.mutateAsync({
        name: formData.name.trim(),
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        company_name: formData.company_name || undefined,
        address: formData.address || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        country: formData.country || undefined,
        website: formData.website || undefined,
        status: formData.status,
      });
      toast.success("Company added");
      setIsCreateOpen(false);
      setFormData({ name: "", email: "", phone: "", company_name: "", address: "", city: "", state: "", country: "", website: "", status: "active" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to add company");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this company?")) return;
    try {
      await deleteClient.mutateAsync(id);
      toast.success("Company deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete company");
    }
  };

  return (
    <DashboardLayout title="Companies">
      <Card className="shadow-card mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search companies..." className="pl-10" />
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4" /> Add Company
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6">Loading...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-6">No companies.</TableCell></TableRow>
              ) : (
                filtered.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.company_name || "—"}</TableCell>
                    <TableCell>{company.email || "—"}</TableCell>
                    <TableCell>{company.phone || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(company.status)}>
                        {company.status || "active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(company.id)}>
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
            <DialogTitle>Add Company</DialogTitle>
            <DialogDescription>Create a company record.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Address</Label>
              <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createClient.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CompaniesPage;
