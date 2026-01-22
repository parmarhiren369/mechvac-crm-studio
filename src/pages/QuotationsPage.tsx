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
import { Plus, Download, FileText, Clock, CheckCircle, XCircle } from "lucide-react";

interface Quotation {
  id: string;
  quotationNo: string;
  customer: string;
  date: string;
  validUntil: string;
  amount: string;
  status: "Approved" | "Pending" | "Rejected" | "Draft";
}

const quotations: Quotation[] = [
  { id: "1", quotationNo: "QT-2024-001", customer: "Tech Corp Pvt Ltd", date: "22 Jan 2024", validUntil: "22 Feb 2024", amount: "₹12,50,000", status: "Approved" },
  { id: "2", quotationNo: "QT-2024-002", customer: "Global Industries", date: "21 Jan 2024", validUntil: "21 Feb 2024", amount: "₹8,75,000", status: "Pending" },
  { id: "3", quotationNo: "QT-2024-003", customer: "Prime Solutions", date: "20 Jan 2024", validUntil: "20 Feb 2024", amount: "₹15,00,000", status: "Draft" },
  { id: "4", quotationNo: "QT-2024-004", customer: "Apex Ltd", date: "19 Jan 2024", validUntil: "19 Feb 2024", amount: "₹6,25,000", status: "Rejected" },
  { id: "5", quotationNo: "QT-2024-005", customer: "InnoTech Solutions", date: "18 Jan 2024", validUntil: "18 Feb 2024", amount: "₹22,00,000", status: "Approved" },
];

const getStatusStyle = (status: Quotation["status"]) => {
  switch (status) {
    case "Approved": return { bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle };
    case "Pending": return { bg: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock };
    case "Rejected": return { bg: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle };
    default: return { bg: "bg-muted text-muted-foreground border-muted", icon: FileText };
  }
};

const QuotationsPage = () => {
  return (
    <DashboardLayout title="Quotations">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Quotations", value: "1,234", change: "+12%", icon: FileText, color: "from-primary to-primary/70" },
          { label: "Approved", value: "456", change: "+8%", icon: CheckCircle, color: "from-emerald-500 to-emerald-600" },
          { label: "Pending", value: "289", change: "-3%", icon: Clock, color: "from-amber-500 to-amber-600" },
          { label: "Total Value", value: "₹2.4Cr", change: "+18%", icon: FileText, color: "from-blue-500 to-blue-600" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
            <CardContent className="p-5 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-emerald-500 mt-1">{stat.change} this month</p>
                </div>
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">All Quotations</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
            <Button className="bg-primary hover:bg-primary/90 gap-2"><Plus className="h-4 w-4" /> New Quotation</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Quotation No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((q, index) => {
                const statusStyle = getStatusStyle(q.status);
                return (
                  <TableRow 
                    key={q.id} 
                    className="hover:bg-muted/50 transition-colors animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-semibold text-primary">{q.quotationNo}</TableCell>
                    <TableCell className="font-medium">{q.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{q.date}</TableCell>
                    <TableCell className="text-muted-foreground">{q.validUntil}</TableCell>
                    <TableCell className="font-semibold">{q.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${statusStyle.bg} gap-1`}>
                        <statusStyle.icon className="h-3 w-3" />
                        {q.status}
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

export default QuotationsPage;
