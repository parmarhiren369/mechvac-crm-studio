import { Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/hooks/use-database";
import { Link } from "react-router-dom";

export const MyTasks = () => {
  const { data: tasks, isLoading } = useTasks();
  const pendingTasks = (tasks ?? [])
    .filter((task) => !task.completed_at && task.status !== "completed")
    .slice(0, 5);

  const formatDate = (value?: string) => {
    if (!value) return "No due date";
    return new Date(value).toLocaleDateString();
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 animate-slide-up h-full overflow-hidden">
      <div className="h-1 bg-emerald-500"></div>
      <CardHeader className="pb-4 pt-5 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          My Tasks
        </CardTitle>
        <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5 shadow-lg rounded-xl transition-all hover:scale-105">
          <Link to="/tasks">
            <Plus className="h-4 w-4" />
            Create
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading tasks...</div>
        ) : pendingTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="relative inline-block">
              <CheckCircle2 className="relative h-16 w-16 text-emerald-500/60 mx-auto mb-4" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-1">
              Hey! no task for you today.
            </p>
            <button className="text-cyan-600 hover:text-cyan-700 text-sm mt-2 font-medium transition-colors">
              Show more...
            </button>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={!!task.completed_at}
                  className="h-4 w-4 rounded border-primary text-primary"
                  readOnly
                />
                <div className="flex-1">
                  <div className={task.completed_at ? "line-through text-muted-foreground" : ""}>
                    {task.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{formatDate(task.due_date)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
