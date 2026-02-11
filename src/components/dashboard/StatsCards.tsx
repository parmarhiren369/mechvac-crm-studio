import { Users, FileText, ShoppingCart, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLeads, useQuotations, useOrders } from "@/hooks/use-database";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
}

export const StatsCards = () => {
  const { data: leads } = useLeads();
  const { data: quotations } = useQuotations();
  const { data: orders } = useOrders();

  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const startCurrent = now - thirtyDays;
  const startPrevious = now - 2 * thirtyDays;

  const parseDate = (value?: string) => (value ? new Date(value).getTime() : 0);

  const countInRange = (items?: { created_at?: string }[], start = 0, end = 0) =>
    items?.filter((item) => {
      const ts = parseDate(item.created_at);
      return ts >= start && ts < end;
    }).length ?? 0;

  const changeFor = (current: number, previous: number) => {
    if (previous <= 0) {
      return { change: "—", changeType: "neutral" as const };
    }
    const diff = ((current - previous) / previous) * 100;
    const sign = diff >= 0 ? "+" : "";
    return {
      change: `${sign}${diff.toFixed(1)}%`,
      changeType: diff >= 0 ? "positive" : "negative",
    } as const;
  };

  const leadTotal = leads?.length ?? 0;
  const leadCurrent = countInRange(leads, startCurrent, now);
  const leadPrevious = countInRange(leads, startPrevious, startCurrent);

  const quotationTotal = quotations?.length ?? 0;
  const quotationCurrent = countInRange(quotations, startCurrent, now);
  const quotationPrevious = countInRange(quotations, startPrevious, startCurrent);

  const orderTotal = orders?.length ?? 0;
  const orderCurrent = countInRange(orders, startCurrent, now);
  const orderPrevious = countInRange(orders, startPrevious, startCurrent);

  const revenueTotal =
    orders?.reduce(
      (sum, order) => sum + (order.total_amount ?? order.amount ?? 0),
      0
    ) ?? 0;

  const revenueCurrent =
    orders?.filter((order) => {
      const ts = parseDate(order.created_at);
      return ts >= startCurrent && ts < now;
    }).reduce((sum, order) => sum + (order.total_amount ?? order.amount ?? 0), 0) ?? 0;

  const revenuePrevious =
    orders?.filter((order) => {
      const ts = parseDate(order.created_at);
      return ts >= startPrevious && ts < startCurrent;
    }).reduce((sum, order) => sum + (order.total_amount ?? order.amount ?? 0), 0) ?? 0;

  const stats: StatCard[] = [
    {
      title: "Total Leads",
      value: leadTotal.toLocaleString(),
      ...changeFor(leadCurrent, leadPrevious),
      icon: Users,
      iconBg: "bg-cyan-500",
    },
    {
      title: "Quotations",
      value: quotationTotal.toLocaleString(),
      ...changeFor(quotationCurrent, quotationPrevious),
      icon: FileText,
      iconBg: "bg-amber-500",
    },
    {
      title: "Orders",
      value: orderTotal.toLocaleString(),
      ...changeFor(orderCurrent, orderPrevious),
      icon: ShoppingCart,
      iconBg: "bg-emerald-500",
    },
    {
      title: "Revenue",
      value: revenueTotal.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
      ...changeFor(revenueCurrent, revenuePrevious),
      icon: TrendingUp,
      iconBg: "bg-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
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
        </Card>
      ))}
    </div>
  );
};
