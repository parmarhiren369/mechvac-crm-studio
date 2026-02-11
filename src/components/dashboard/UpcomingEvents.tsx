import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalendarEvents } from "@/hooks/use-database";

export const UpcomingEvents = () => {
  const { data: events, isLoading } = useCalendarEvents();
  const now = Date.now();
  const upcoming = (events ?? [])
    .filter((event) => new Date(event.start_date).getTime() >= now)
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .slice(0, 5);

  const formatDate = (value: string) => new Date(value).toLocaleDateString();
  const formatTime = (value: string) => new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 animate-slide-up overflow-hidden">
      <div className="h-1 bg-blue-500"></div>
      <CardHeader className="pb-4 pt-5">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[150px]">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading events...</div>
        ) : upcoming.length === 0 ? (
          <div className="text-center py-8">
            <div className="relative inline-block">
              <Calendar className="relative h-16 w-16 text-blue-500/60 mx-auto mb-4" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              Hey! You have no upcoming events
            </p>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {upcoming.map((event) => (
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
                    <span>{formatDate(event.start_date)} at {formatTime(event.start_date)}</span>
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
