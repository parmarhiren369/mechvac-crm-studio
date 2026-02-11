import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, FileText, Clock, CheckCircle, XCircle, Trash2 } from "lucide-react";
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
import { useQuotations, useCreateQuotation, useDeleteQuotation } from "@/hooks/use-database";
import { toast } from "sonner";

const getStatusStyle = (status?: string) => {
  switch ((status || "").toLowerCase()) {
    case "approved":
    case "accepted":
      return { bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle };
    case "pending":
      return { bg: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock };
    case "rejected":
      return { bg: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle };
    default:
      return { bg: "bg-muted text-muted-foreground border-muted", icon: FileText };
  }
};

const QuotationsPage = () => {
  const { data: quotations, isLoading } = useQuotations();
  const createQuotation = useCreateQuotation();
  const deleteQuotation = useDeleteQuotation();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    quotation_number: "",
    client_id: "",
    subject: "",
    amount: "",
    tax: "",
    total_amount: "",
    status: "draft",
    valid_until: "",
    issued_date: "",
  });

  const handleCreate = async () => {
    try {
      await createQuotation.mutateAsync({
        quotation_number: formData.quotation_number || undefined,
        client_id: formData.client_id ? Number(formData.client_id) : undefined,
        subject: formData.subject || undefined,
        amount: formData.amount ? Number(formData.amount) : undefined,
        tax: formData.tax ? Number(formData.tax) : undefined,
        total_amount: formData.total_amount ? Number(formData.total_amount) : undefined,
        status: formData.status,
        valid_until: formData.valid_until || undefined,
        issued_date: formData.issued_date || undefined,
      });
      toast.success("Quotation created");
      setIsCreateOpen(false);
      setFormData({ quotation_number: "", client_id: "", subject: "", amount: "", tax: "", total_amount: "", status: "draft", valid_until: "", issued_date: "" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to create quotation");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this quotation?")) return;
    try {
      await deleteQuotation.mutateAsync(id);
      toast.success("Quotation deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete quotation");
    }
  };

  return (
    <DashboardLayout title="Quotations">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">All Quotations</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4" /> New Quotation
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Quotation No</TableHead>
                <TableHead>Client ID</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">Loading...</TableCell>
                </TableRow>
              ) : (quotations ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">No quotations yet.</TableCell>
                </TableRow>
              ) : (
                (quotations ?? []).map((q) => {
                  const statusStyle = getStatusStyle(q.status);
                  return (
                    <TableRow key={q.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-primary">{q.quotation_number || `QT-${q.id}`}</TableCell>
                      <TableCell>{q.client_id ?? "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{q.issued_date ? new Date(q.issued_date).toLocaleDateString() : "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{q.valid_until ? new Date(q.valid_until).toLocaleDateString() : "—"}</TableCell>
                      <TableCell className="font-semibold">
                        {(q.total_amount ?? q.amount ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${statusStyle.bg} gap-1`}>
                          <statusStyle.icon className="h-3 w-3" />
                          {q.status || "draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(q.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Quotation</DialogTitle>
            <DialogDescription>Create a quotation record.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Quotation No</Label>
              <Input value={formData.quotation_number} onChange={(e) => setFormData({ ...formData, quotation_number: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Client ID</Label>
              <Input value={formData.client_id} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Subject</Label>
              <Input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Tax</Label>
              <Input value={formData.tax} onChange={(e) => setFormData({ ...formData, tax: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Total Amount</Label>
              <Input value={formData.total_amount} onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Issued Date</Label>
              <Input type="date" value={formData.issued_date} onChange={(e) => setFormData({ ...formData, issued_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Valid Until</Label>
              <Input type="date" value={formData.valid_until} onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createQuotation.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default QuotationsPage;
