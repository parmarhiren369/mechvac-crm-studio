import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Download, MoreHorizontal, Phone, Mail, Eye } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  lastContacted: string;
  assignedTo: { name: string; initials: string };
  status: "Hot" | "Warm" | "Cold" | "General";
  source: string;
  value: string;
}

const leads: Lead[] = [
  { id: "1", name: "Ms. Shobhna Chhabra", company: "Tech Corp", email: "shobhna@techcorp.com", phone: "+91 98765 43210", lastContacted: "1 hour ago", assignedTo: { name: "Ms. Bhargesha", initials: "MB" }, status: "Hot", source: "Website", value: "₹12.5L" },
  { id: "2", name: "Pranav Kalen", company: "Global Industries", email: "pranav@global.com", phone: "+91 87654 32109", lastContacted: "2 days ago", assignedTo: { name: "Mr. Jigar", initials: "JG" }, status: "Warm", source: "Referral", value: "₹8.2L" },
  { id: "3", name: "Mr. Yatin Tamke", company: "Prime Solutions", email: "yatin@prime.com", phone: "+91 76543 21098", lastContacted: "3 days ago", assignedTo: { name: "Ms. Bhargesha", initials: "MB" }, status: "Cold", source: "LinkedIn", value: "₹5.8L" },
  { id: "4", name: "Mr. Sandeep Shelar", company: "Apex Ltd", email: "sandeep@apex.com", phone: "+91 65432 10987", lastContacted: "1 week ago", assignedTo: { name: "Mr. Jigar", initials: "JG" }, status: "General", source: "Exhibition", value: "₹15.3L" },
  { id: "5", name: "Mrs. Priya Sharma", company: "InnoTech", email: "priya@innotech.com", phone: "+91 54321 09876", lastContacted: "2 hours ago", assignedTo: { name: "Ms. Bhargesha", initials: "MB" }, status: "Hot", source: "Website", value: "₹22.1L" },
  { id: "6", name: "Mr. Rajesh Kumar", company: "BuildMax", email: "rajesh@buildmax.com", phone: "+91 43210 98765", lastContacted: "5 days ago", assignedTo: { name: "Mr. Jigar", initials: "JG" }, status: "Warm", source: "Cold Call", value: "₹9.7L" },
];

const getStatusColor = (status: Lead["status"]) => {
  switch (status) {
    case "Hot": return "bg-destructive/10 text-destructive border-destructive/20";
    case "Warm": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "Cold": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    default: return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  }
};

const LeadsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <DashboardLayout title="All Leads">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Leads", value: "2,847", color: "bg-primary" },
          { label: "Hot Leads", value: "156", color: "bg-destructive" },
          { label: "Warm Leads", value: "423", color: "bg-amber-500" },
          { label: "Cold Leads", value: "892", color: "bg-blue-500" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className={`absolute inset-0 ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Table Card */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="text-xl font-semibold">Lead Management</CardTitle>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="h-4 w-4" /> Add Lead
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Lead Details</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Contacted</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead, index) => (
                <TableRow 
                  key={lead.id} 
                  className="hover:bg-muted/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white font-semibold">
                          {lead.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{lead.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.lastContacted}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">{lead.assignedTo.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{lead.assignedTo.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">{lead.value}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(lead.status)} font-medium`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default LeadsPage;
