import { Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  dueDate?: string;
  completed: boolean;
}

const tasks: Task[] = [];

export const MyTasks = () => {
  return (
    <Card className="shadow-card animate-fade-in h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
        <Button size="sm" className="bg-brand-success hover:bg-brand-success/90 text-white gap-1">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-1">
              Hey! no task for you today.
            </p>
            <button className="text-primary hover:underline text-sm mt-2">
              Show more...
            </button>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="h-4 w-4 rounded border-primary text-primary"
                  readOnly
                />
                <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
