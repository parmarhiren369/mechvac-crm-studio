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
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 animate-slide-up h-full overflow-hidden">
      {/* Gradient header accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
      <CardHeader className="pb-4 pt-5 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"></div>
          My Tasks
        </CardTitle>
        <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white gap-1.5 shadow-lg shadow-emerald-500/30 rounded-xl transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-xl"></div>
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
