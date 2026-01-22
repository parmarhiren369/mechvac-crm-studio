import { Users, FileText, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const stats: StatCard[] = [
  {
    title: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
    color: "bg-brand-teal",
  },
  {
    title: "Quotations",
    value: "1,234",
    change: "+8.2%",
    changeType: "positive",
    icon: FileText,
    color: "bg-brand-amber",
  },
  {
    title: "Orders",
    value: "567",
    change: "+23.1%",
    changeType: "positive",
    icon: ShoppingCart,
    color: "bg-brand-success",
  },
  {
    title: "Revenue",
    value: "₹45.2L",
    change: "+15.3%",
    changeType: "positive",
    icon: TrendingUp,
    color: "bg-brand-info",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="shadow-card hover:shadow-card-hover transition-shadow animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 font-medium ${
                  stat.changeType === "positive" 
                    ? "text-brand-success" 
                    : stat.changeType === "negative" 
                    ? "text-destructive" 
                    : "text-muted-foreground"
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
