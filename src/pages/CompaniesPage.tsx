import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building2, MapPin, Phone, Mail, Globe, MoreHorizontal } from "lucide-react";

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  employees: string;
  revenue: string;
  status: "Active" | "Inactive" | "Prospect";
}

const companies: Company[] = [
  { id: "1", name: "Tech Corp Pvt Ltd", industry: "Technology", location: "Mumbai, Maharashtra", phone: "+91 22 2345 6789", email: "info@techcorp.com", website: "techcorp.com", employees: "500+", revenue: "₹50Cr+", status: "Active" },
  { id: "2", name: "Global Industries", industry: "Manufacturing", location: "Pune, Maharashtra", phone: "+91 20 3456 7890", email: "contact@global.com", website: "globalind.com", employees: "1000+", revenue: "₹100Cr+", status: "Active" },
  { id: "3", name: "Prime Solutions", industry: "Services", location: "Bangalore, Karnataka", phone: "+91 80 4567 8901", email: "hello@prime.com", website: "primesol.com", employees: "200+", revenue: "₹25Cr+", status: "Prospect" },
  { id: "4", name: "Apex Ltd", industry: "Engineering", location: "Chennai, Tamil Nadu", phone: "+91 44 5678 9012", email: "info@apex.com", website: "apexltd.com", employees: "750+", revenue: "₹75Cr+", status: "Active" },
  { id: "5", name: "InnoTech Solutions", industry: "Technology", location: "Hyderabad, Telangana", phone: "+91 40 6789 0123", email: "team@innotech.com", website: "innotech.com", employees: "300+", revenue: "₹35Cr+", status: "Inactive" },
];

const getStatusColor = (status: Company["status"]) => {
  switch (status) {
    case "Active": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "Inactive": return "bg-muted text-muted-foreground border-muted";
    default: return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  }
};

const CompaniesPage = () => {
  return (
    <DashboardLayout title="Companies">
      {/* Header */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search companies..." className="pl-10" />
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" /> Add Company
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <Card 
            key={company.id} 
            className="shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in group overflow-hidden"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                    <AvatarFallback className="bg-primary text-white font-bold text-lg">
                      {company.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors cursor-pointer">{company.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary hover:underline cursor-pointer">{company.website}</span>
              </div>
              
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Employees</p>
                    <p className="font-semibold">{company.employees}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-semibold">{company.revenue}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(company.status)}>
                  {company.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CompaniesPage;
