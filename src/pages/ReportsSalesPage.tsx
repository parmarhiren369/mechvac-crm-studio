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
import { Download } from "lucide-react";
import { useOrders, useQuotations } from "@/hooks/use-database";
import { downloadCsv } from "@/lib/export";

const ReportsSalesPage = () => {
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: quotations, isLoading: quotationsLoading } = useQuotations();

  const totalOrders = orders?.length ?? 0;
  const totalRevenue = (orders ?? []).reduce(
    (sum, order) => sum + (order.total_amount ?? order.amount ?? 0),
    0
  );
  const pending = (orders ?? []).filter((order) => (order.status || "").toLowerCase() === "pending").length;
  const delivered = (orders ?? []).filter((order) => (order.status || "").toLowerCase() === "delivered").length;
  const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  const totalQuotations = quotations?.length ?? 0;
  const totalQuotedValue = (quotations ?? []).reduce(
    (sum, quotation) => sum + (quotation.total_amount ?? quotation.amount ?? 0),
    0
  );

  const handleExport = () => {
    const rows = (orders ?? []).map((order) => ({
      order_number: order.order_number || `ORD-${order.id}`,
      client_id: order.client_id || "",
      status: order.status || "",
      order_date: order.order_date || "",
      delivery_date: order.delivery_date || "",
      amount: order.amount || 0,
      tax: order.tax || 0,
      total_amount: order.total_amount || order.amount || 0,
    }));
    downloadCsv("sales-report.csv", rows);
  };

  return (
    <DashboardLayout title="Sales Report" breadcrumb={[{ label: "Reports" }, { label: "Sales Report" }]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Sales Summary</h2>
            <p className="text-sm text-muted-foreground">Overview of orders and quotations.</p>
          </div>
          <Button className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: totalOrders },
            { label: "Revenue", value: totalRevenue.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }) },
            { label: "Avg Order", value: avgOrder.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }) },
            { label: "Delivered", value: delivered },
          ].map((stat) => (
            <Card key={stat.label} className="shadow-card">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Quotation Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Quotations</p>
              <p className="text-2xl font-semibold">{totalQuotations}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quoted Value</p>
              <p className="text-2xl font-semibold">
                {totalQuotedValue.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">Loading...</TableCell>
                  </TableRow>
                ) : (orders ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">No orders yet.</TableCell>
                  </TableRow>
                ) : (
                  (orders ?? []).slice(0, 8).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.order_number || `ORD-${order.id}`}</TableCell>
                      <TableCell>{order.client_id ?? "—"}</TableCell>
                      <TableCell>{order.order_date ? new Date(order.order_date).toLocaleDateString() : "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.status || "pending"}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {(order.total_amount ?? order.amount ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">Order Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Badge variant="outline">Pending: {pending}</Badge>
            <Badge variant="outline">Delivered: {delivered}</Badge>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsSalesPage;
