import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Mail, Phone, MapPin, MoreHorizontal, Users } from "lucide-react";

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "On Leave" | "Inactive";
  leadsAssigned: number;
  tasksCompleted: number;
}

const staffMembers: Staff[] = [
  { id: "1", name: "Ms. Bhargesha Patel", role: "Sales Manager", department: "Sales", email: "bhargesha@mechvac.com", phone: "+91 98765 43210", location: "Mumbai", status: "Active", leadsAssigned: 45, tasksCompleted: 128 },
  { id: "2", name: "Mr. Jigar Shah", role: "Senior Sales Executive", department: "Sales", email: "jigar@mechvac.com", phone: "+91 87654 32109", location: "Mumbai", status: "Active", leadsAssigned: 38, tasksCompleted: 95 },
  { id: "3", name: "Ms. Priya Sharma", role: "Sales Executive", department: "Sales", email: "priya@mechvac.com", phone: "+91 76543 21098", location: "Pune", status: "On Leave", leadsAssigned: 22, tasksCompleted: 67 },
  { id: "4", name: "Mr. Amit Kumar", role: "Technical Specialist", department: "Technical", email: "amit@mechvac.com", phone: "+91 65432 10987", location: "Bangalore", status: "Active", leadsAssigned: 15, tasksCompleted: 82 },
  { id: "5", name: "Ms. Neha Gupta", role: "Customer Support", department: "Support", email: "neha@mechvac.com", phone: "+91 54321 09876", location: "Mumbai", status: "Active", leadsAssigned: 0, tasksCompleted: 156 },
  { id: "6", name: "Mr. Rahul Verma", role: "Sales Executive", department: "Sales", email: "rahul@mechvac.com", phone: "+91 43210 98765", location: "Delhi", status: "Inactive", leadsAssigned: 0, tasksCompleted: 43 },
];

const getStatusColor = (status: Staff["status"]) => {
  switch (status) {
    case "Active": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "On Leave": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default: return "bg-muted text-muted-foreground border-muted";
  }
};

const StaffPage = () => {
  return (
    <DashboardLayout title="Staff">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Staff", value: "24", color: "from-primary to-primary/80" },
          { label: "Active", value: "20", color: "from-emerald-500 to-emerald-600" },
          { label: "On Leave", value: "3", color: "from-amber-500 to-amber-600" },
          { label: "Departments", value: "5", color: "from-blue-500 to-blue-600" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity`} />
            <CardContent className="p-5 relative flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-4 flex items-center justify-between">
          <CardTitle className="text-xl">Team Members</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" /> Add Staff
          </Button>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {staffMembers.map((staff, index) => (
          <Card 
            key={staff.id} 
            className="shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in group overflow-hidden"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="h-16 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80" />
            <CardContent className="pt-0 relative">
              <div className="flex justify-between items-start -mt-8">
                <Avatar className="h-16 w-16 ring-4 ring-background shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white font-bold text-xl">
                    {staff.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground mt-10">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-3">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{staff.name}</h3>
                <p className="text-sm text-primary">{staff.role}</p>
                <p className="text-sm text-muted-foreground">{staff.department}</p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{staff.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-foreground">{staff.leadsAssigned}</p>
                    <p className="text-xs text-muted-foreground">Leads</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground">{staff.tasksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(staff.status)}>
                  {staff.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default StaffPage;
