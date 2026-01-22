import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Plus, Clock, MapPin, Users, Video, Phone } from "lucide-react";

interface Event {
  id: string;
  title: string;
  time: string;
  type: "meeting" | "call" | "deadline" | "site-visit";
  location?: string;
  attendees?: string[];
}

const todayEvents: Event[] = [
  { id: "1", title: "Client Meeting - Tech Corp", time: "10:00 AM", type: "meeting", location: "Conference Room A", attendees: ["Ms. Bhargesha", "Mr. Jigar"] },
  { id: "2", title: "Follow-up Call - Global Industries", time: "11:30 AM", type: "call", attendees: ["Ms. Bhargesha"] },
  { id: "3", title: "Site Visit - Prime Solutions", time: "2:00 PM", type: "site-visit", location: "Andheri East, Mumbai" },
  { id: "4", title: "Quotation Deadline - Apex Ltd", time: "5:00 PM", type: "deadline" },
];

const getEventConfig = (type: Event["type"]) => {
  switch (type) {
    case "meeting": return { color: "bg-primary/10 text-primary border-primary/20", icon: Video, gradient: "from-primary/20 to-primary/5" };
    case "call": return { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: Phone, gradient: "from-emerald-500/20 to-emerald-500/5" };
    case "site-visit": return { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: MapPin, gradient: "from-blue-500/20 to-blue-500/5" };
    default: return { color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock, gradient: "from-amber-500/20 to-amber-500/5" };
  }
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardLayout title="Calendar">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <Card className="shadow-card lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">January 2024</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl">Today's Schedule</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Wednesday, 22 January 2024</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayEvents.map((event, index) => {
              const config = getEventConfig(event.type);
              return (
                <div 
                  key={event.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-x-1 animate-fade-in overflow-hidden group`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="relative flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0`}>
                      <config.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <Badge variant="outline" className={config.color}>
                          {event.type.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>{event.attendees.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
