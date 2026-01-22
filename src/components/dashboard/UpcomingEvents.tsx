import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "call" | "deadline" | "reminder";
}

const events: Event[] = [];

export const UpcomingEvents = () => {
  return (
    <Card className="shadow-card animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[150px]">
        {events.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">
              Hey! You have no upcoming events
            </p>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{event.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
