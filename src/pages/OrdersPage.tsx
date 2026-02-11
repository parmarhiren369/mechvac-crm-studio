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
import { Package, Truck, CheckCircle2, Clock, AlertCircle, Plus, Trash2 } from "lucide-react";
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
import { useOrders, useCreateOrder, useDeleteOrder } from "@/hooks/use-database";
import { toast } from "sonner";

const getStatusConfig = (status?: string) => {
  switch ((status || "").toLowerCase()) {
    case "delivered":
      return { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 };
    case "in transit":
    case "in_transit":
      return { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Truck };
    case "processing":
      return { color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Package };
    case "pending":
      return { color: "bg-muted text-muted-foreground border-muted", icon: Clock };
    default:
      return { color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle };
  }
};

const OrdersPage = () => {
  const { data: orders, isLoading } = useOrders();
  const createOrder = useCreateOrder();
  const deleteOrder = useDeleteOrder();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    order_number: "",
    client_id: "",
    quotation_id: "",
    description: "",
    amount: "",
    tax: "",
    total_amount: "",
    status: "pending",
    order_date: "",
    delivery_date: "",
  });

  const handleCreate = async () => {
    try {
      await createOrder.mutateAsync({
        order_number: formData.order_number || undefined,
        client_id: formData.client_id ? Number(formData.client_id) : undefined,
        quotation_id: formData.quotation_id ? Number(formData.quotation_id) : undefined,
        description: formData.description || undefined,
        amount: formData.amount ? Number(formData.amount) : undefined,
        tax: formData.tax ? Number(formData.tax) : undefined,
        total_amount: formData.total_amount ? Number(formData.total_amount) : undefined,
        status: formData.status,
        order_date: formData.order_date || undefined,
        delivery_date: formData.delivery_date || undefined,
      });
      toast.success("Order created");
      setIsCreateOpen(false);
      setFormData({ order_number: "", client_id: "", quotation_id: "", description: "", amount: "", tax: "", total_amount: "", status: "pending", order_date: "", delivery_date: "" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to create order");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this order?")) return;
    try {
      await deleteOrder.mutateAsync(id);
      toast.success("Order deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete order");
    }
  };

  return (
    <DashboardLayout title="Orders">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Order Management</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4" /> New Order
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Order No</TableHead>
                <TableHead>Client ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={7} className="text-center py-6">Loading...</TableCell></TableRow>
              ) : (orders ?? []).length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-6">No orders yet.</TableCell></TableRow>
              ) : (
                (orders ?? []).map((order) => {
                  const config = getStatusConfig(order.status);
                  return (
                    <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-primary">{order.order_number || `ORD-${order.id}`}</TableCell>
                      <TableCell>{order.client_id ?? "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{order.order_date ? new Date(order.order_date).toLocaleDateString() : "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : "—"}</TableCell>
                      <TableCell className="font-semibold">
                        {(order.total_amount ?? order.amount ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${config.color} gap-1`}>
                          <config.icon className="h-3 w-3" />
                          {order.status || "pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(order.id)}>
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
            <DialogTitle>New Order</DialogTitle>
            <DialogDescription>Create an order record.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Order No</Label>
              <Input value={formData.order_number} onChange={(e) => setFormData({ ...formData, order_number: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Client ID</Label>
              <Input value={formData.client_id} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Quotation ID</Label>
              <Input value={formData.quotation_id} onChange={(e) => setFormData({ ...formData, quotation_id: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
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
              <Label>Order Date</Label>
              <Input type="date" value={formData.order_date} onChange={(e) => setFormData({ ...formData, order_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Input type="date" value={formData.delivery_date} onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createOrder.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default OrdersPage;
