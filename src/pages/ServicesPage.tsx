import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, Clock, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";

interface ServiceRequest {
  id: string;
  ticketNo: string;
  customer: string;
  product: string;
  issue: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Scheduled" | "Pending";
  scheduledDate: string;
  assignedTo: string;
}

const serviceRequests: ServiceRequest[] = [
  { id: "1", ticketNo: "SRV-2024-001", customer: "Tech Corp", product: "VP-2000", issue: "Maintenance required", priority: "Medium", status: "Scheduled", scheduledDate: "25 Jan 2024", assignedTo: "Mr. Amit" },
  { id: "2", ticketNo: "SRV-2024-002", customer: "Global Industries", product: "IB-500", issue: "Motor replacement", priority: "High", status: "In Progress", scheduledDate: "22 Jan 2024", assignedTo: "Mr. Rahul" },
  { id: "3", ticketNo: "SRV-2024-003", customer: "Prime Solutions", product: "CU-100", issue: "Annual service", priority: "Low", status: "Completed", scheduledDate: "20 Jan 2024", assignedTo: "Mr. Amit" },
  { id: "4", ticketNo: "SRV-2024-004", customer: "Apex Ltd", product: "HE-X200", issue: "Emergency repair", priority: "High", status: "Pending", scheduledDate: "TBD", assignedTo: "Unassigned" },
];

const getPriorityColor = (priority: ServiceRequest["priority"]) => {
  switch (priority) {
    case "High": return "bg-destructive/10 text-destructive border-destructive/20";
    case "Medium": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default: return "bg-blue-500/10 text-blue-600 border-blue-500/20";
  }
};

const getStatusConfig = (status: ServiceRequest["status"]) => {
  switch (status) {
    case "Completed": return { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 };
    case "In Progress": return { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Wrench };
    case "Scheduled": return { color: "bg-primary/10 text-primary border-primary/20", icon: Calendar };
    default: return { color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: AlertTriangle };
  }
};

const ServicesPage = () => {
  return (
    <DashboardLayout title="Services">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Requests", value: "89", icon: Wrench, color: "primary" },
          { label: "Completed", value: "52", icon: CheckCircle2, color: "emerald-500" },
          { label: "In Progress", value: "18", icon: Clock, color: "blue-500" },
          { label: "Pending", value: "19", icon: AlertTriangle, color: "amber-500" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 relative flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl bg-${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Requests */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Service Requests</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" /> New Request
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {serviceRequests.map((request, index) => {
            const statusConfig = getStatusConfig(request.status);
            return (
              <div 
                key={request.id}
                className="p-4 rounded-xl border bg-card hover:bg-muted/20 transition-all duration-300 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <Wrench className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-primary">{request.ticketNo}</span>
                        <Badge variant="outline" className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge variant="outline" className={`${statusConfig.color} gap-1`}>
                          <statusConfig.icon className="h-3 w-3" />
                          {request.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground">{request.customer}</h3>
                      <p className="text-sm text-muted-foreground">{request.product} - {request.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <p className="text-muted-foreground">Scheduled</p>
                      <p className="font-medium">{request.scheduledDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assigned To</p>
                      <p className="font-medium">{request.assignedTo}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ServicesPage;
