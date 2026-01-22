import { Users, FileText, ShoppingCart, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  iconBg: string;
}

const stats: StatCard[] = [
  {
    title: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
    gradient: "from-cyan-500 to-teal-600",
    iconBg: "bg-gradient-to-br from-cyan-500 to-teal-600",
  },
  {
    title: "Quotations",
    value: "1,234",
    change: "+8.2%",
    changeType: "positive",
    icon: FileText,
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    title: "Orders",
    value: "567",
    change: "+23.1%",
    changeType: "positive",
    icon: ShoppingCart,
    gradient: "from-emerald-500 to-green-600",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
  },
  {
    title: "Revenue",
    value: "₹45.2L",
    change: "+15.3%",
    changeType: "positive",
    icon: TrendingUp,
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient background overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
          
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium mb-2">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className={`h-14 w-14 rounded-2xl ${stat.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                stat.changeType === "positive" 
                  ? "bg-emerald-500/10 text-emerald-600" 
                  : stat.changeType === "negative" 
                  ? "bg-red-500/10 text-red-600" 
                  : "bg-gray-500/10 text-gray-600"
              }`}>
                <ArrowUpRight className="h-3 w-3" />
                {stat.change}
              </div>
              <span className="text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>

          {/* Decorative corner element */}
          <div className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`}></div>
        </Card>
      ))}
    </div>
  );
};
