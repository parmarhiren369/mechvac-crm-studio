import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Truck, CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";

interface Order {
  id: string;
  orderNo: string;
  customer: string;
  products: string;
  orderDate: string;
  deliveryDate: string;
  amount: string;
  status: "Delivered" | "In Transit" | "Processing" | "Pending" | "Cancelled";
  progress: number;
}

const orders: Order[] = [
  { id: "1", orderNo: "ORD-2024-001", customer: "Tech Corp", products: "Vacuum Pump VP-2000", orderDate: "15 Jan 2024", deliveryDate: "25 Jan 2024", amount: "₹8,50,000", status: "Delivered", progress: 100 },
  { id: "2", orderNo: "ORD-2024-002", customer: "Global Industries", products: "Industrial Blower IB-500", orderDate: "18 Jan 2024", deliveryDate: "28 Jan 2024", amount: "₹12,00,000", status: "In Transit", progress: 75 },
  { id: "3", orderNo: "ORD-2024-003", customer: "Prime Solutions", products: "Compressor Unit CU-100", orderDate: "20 Jan 2024", deliveryDate: "30 Jan 2024", amount: "₹6,25,000", status: "Processing", progress: 40 },
  { id: "4", orderNo: "ORD-2024-004", customer: "Apex Ltd", products: "Heat Exchanger HE-X200", orderDate: "21 Jan 2024", deliveryDate: "01 Feb 2024", amount: "₹15,75,000", status: "Pending", progress: 10 },
  { id: "5", orderNo: "ORD-2024-005", customer: "InnoTech", products: "Filtration System FS-300", orderDate: "22 Jan 2024", deliveryDate: "02 Feb 2024", amount: "₹4,80,000", status: "Cancelled", progress: 0 },
];

const getStatusConfig = (status: Order["status"]) => {
  switch (status) {
    case "Delivered": return { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2, progressColor: "bg-emerald-500" };
    case "In Transit": return { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Truck, progressColor: "bg-blue-500" };
    case "Processing": return { color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Package, progressColor: "bg-amber-500" };
    case "Pending": return { color: "bg-muted text-muted-foreground border-muted", icon: Clock, progressColor: "bg-muted-foreground" };
    default: return { color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle, progressColor: "bg-destructive" };
  }
};

const OrdersPage = () => {
  return (
    <DashboardLayout title="Orders">
      {/* Order Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Orders", value: "567", icon: Package, gradient: "from-primary via-primary to-primary/80" },
          { label: "Delivered", value: "342", icon: CheckCircle2, gradient: "from-emerald-500 via-emerald-500 to-emerald-600" },
          { label: "In Transit", value: "89", icon: Truck, gradient: "from-blue-500 via-blue-500 to-blue-600" },
          { label: "Processing", value: "78", icon: Package, gradient: "from-amber-500 via-amber-500 to-amber-600" },
          { label: "Pending", value: "58", icon: Clock, gradient: "from-slate-500 via-slate-500 to-slate-600" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity`} />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Order Management</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" /> New Order
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => {
                const config = getStatusConfig(order.status);
                return (
                  <TableRow 
                    key={order.id} 
                    className="hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-semibold text-primary">{order.orderNo}</TableCell>
                    <TableCell className="font-medium">{order.customer}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{order.products}</TableCell>
                    <TableCell className="text-muted-foreground">{order.orderDate}</TableCell>
                    <TableCell className="text-muted-foreground">{order.deliveryDate}</TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress value={order.progress} className="h-2" />
                        <span className="text-xs text-muted-foreground w-8">{order.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${config.color} gap-1`}>
                        <config.icon className="h-3 w-3" />
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default OrdersPage;
