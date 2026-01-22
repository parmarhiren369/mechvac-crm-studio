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

interface Lead {
  id: string;
  name: string;
  lastContacted: string;
  assignedTo: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status: "General" | "Hot" | "Cold" | "Warm";
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Ms. Shobhna Chhabra",
    lastContacted: "1 hour ago",
    assignedTo: { name: "Ms. Bhargesha", initials: "MB" },
    status: "General",
  },
  {
    id: "2",
    name: "Ms. Shobhna Chhabra",
    lastContacted: "2 hours ago",
    assignedTo: { name: "Ms. Bhargesha", initials: "MB" },
    status: "General",
  },
  {
    id: "3",
    name: "Pranav Kalen",
    lastContacted: "2 days ago",
    assignedTo: { name: "Mr. Jigar", initials: "JG" },
    status: "General",
  },
  {
    id: "4",
    name: "Mr.Yatin Tamke",
    lastContacted: "2 days ago",
    assignedTo: { name: "Ms. Bhargesha", initials: "MB" },
    status: "General",
  },
  {
    id: "5",
    name: "Mr.Sandeep Shelar",
    lastContacted: "2 days ago",
    assignedTo: { name: "Ms. Bhargesha", initials: "MB" },
    status: "General",
  },
];

const getStatusColor = (status: Lead["status"]) => {
  switch (status) {
    case "Hot":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "Warm":
      return "bg-brand-amber/10 text-brand-amber border-brand-amber/20";
    case "Cold":
      return "bg-brand-info/10 text-brand-info border-brand-info/20";
    default:
      return "bg-brand-success/10 text-brand-success border-brand-success/20";
  }
};

export const LeadsStatus = () => {
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
            {leads.map((lead, index) => (
              <TableRow 
                key={lead.id} 
                className="hover:bg-cyan-50/50 transition-all duration-200 group cursor-pointer border-b border-border/50 last:border-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 ring-2 ring-background group-hover:ring-cyan-200 transition-all">
                      <AvatarFallback className="bg-slate-100 text-slate-700 text-xs font-semibold">
                        {lead.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground font-medium group-hover:text-cyan-600 transition-colors">
                      {lead.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.lastContacted}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-brand-teal text-white text-xs">
                        {lead.assignedTo.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span>{lead.assignedTo.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(lead.status)} font-medium`}
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
