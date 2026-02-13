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
import { useLeads } from "@/hooks/use-database";
import { downloadCsv } from "@/lib/export";

const ReportsLeadsPage = () => {
  const { data: leads, isLoading } = useLeads();

  const totalLeads = leads?.length ?? 0;
  const converted = (leads ?? []).filter((lead) => (lead.status || "").toLowerCase().includes("converted") || lead.status === "V").length;
  const contacted = (leads ?? []).filter((lead) => (lead.status || "").toLowerCase().includes("contacted") || lead.status === "C").length;
  const qualified = (leads ?? []).filter((lead) => (lead.status || "").toLowerCase().includes("qualified") || lead.status === "Q").length;
  const conversionRate = totalLeads ? Math.round((converted / totalLeads) * 100) : 0;

  const handleExport = () => {
    const rows = (leads ?? []).map((lead) => ({
      name: lead.name,
      email: lead.email || "",
      phone: lead.phone || "",
      company: lead.company || "",
      source: lead.source || "",
      status: lead.status || "",
      created_at: lead.created_at || "",
    }));
    downloadCsv("leads-report.csv", rows);
  };

  return (
    <DashboardLayout title="Lead Report" breadcrumb={[{ label: "Reports" }, { label: "Lead Report" }]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Lead Performance</h2>
            <p className="text-sm text-muted-foreground">Track lead conversions and pipeline health.</p>
          </div>
          <Button className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: totalLeads },
            { label: "Contacted", value: contacted },
            { label: "Qualified", value: qualified },
            { label: "Conversion Rate", value: `${conversionRate}%` },
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
            <CardTitle className="text-xl">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">Loading...</TableCell>
                  </TableRow>
                ) : (leads ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">No leads yet.</TableCell>
                  </TableRow>
                ) : (
                  (leads ?? []).slice(0, 8).map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.company || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.status || "new"}</Badge>
                      </TableCell>
                      <TableCell>{lead.source || "—"}</TableCell>
                      <TableCell className="text-right">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsLeadsPage;
