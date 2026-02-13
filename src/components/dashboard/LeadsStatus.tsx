import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeads } from "@/hooks/use-database";

const getStatusLabel = (status?: string) => {
  const map: Record<string, string> = {
    N: "new",
    C: "contacted",
    Q: "qualified",
    V: "converted",
    L: "lost",
  };
  const normalized = (status || "").toUpperCase();
  return map[normalized] || status || "new";
};

const getStatusColor = (status?: string) => {
  switch (getStatusLabel(status).toLowerCase()) {
    case "hot":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "warm":
      return "bg-brand-amber/10 text-brand-amber border-brand-amber/20";
    case "cold":
      return "bg-brand-info/10 text-brand-info border-brand-info/20";
    case "qualified":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "converted":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "lost":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-brand-success/10 text-brand-success border-brand-success/20";
  }
};

const formatRelative = (value?: string) => {
  if (!value) return "—";
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

export const LeadsStatus = () => {
  const { data: leads, isLoading } = useLeads();
  const recentLeads = (leads ?? []).slice(0, 5);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 animate-slide-up overflow-hidden">
      <div className="h-1 bg-cyan-500"></div>
      <CardHeader className="pb-4 pt-5">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
          Leads Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Name</TableHead>
              <TableHead className="text-muted-foreground font-medium">Last Contacted</TableHead>
              <TableHead className="text-muted-foreground font-medium">Assigned To</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                  Loading leads...
                </TableCell>
              </TableRow>
            ) : recentLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                  No leads yet.
                </TableCell>
              </TableRow>
            ) : (
              recentLeads.map((lead, index) => (
              <TableRow 
                key={lead.id} 
                className="hover:bg-cyan-50/50 transition-all duration-200 group cursor-pointer border-b border-border/50 last:border-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 ring-2 ring-background group-hover:ring-cyan-200 transition-all">
                      <AvatarFallback className="bg-slate-100 text-slate-700 text-xs font-semibold">
                        {lead.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground font-medium group-hover:text-cyan-600 transition-colors">
                      {lead.name || "Unnamed"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatRelative(lead.updated_at || lead.created_at)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-brand-teal text-white text-xs">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <span>Unassigned</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(lead.status)} font-medium`}
                  >
                    {getStatusLabel(lead.status)}
                  </Badge>
                </TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
