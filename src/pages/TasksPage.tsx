import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Calendar, Clock, Flag, CheckCircle2, Circle, AlertTriangle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: { name: string; initials: string };
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "To Do" | "Overdue";
  completed: boolean;
}

const tasks: Task[] = [
  { id: "1", title: "Follow up with Tech Corp lead", description: "Schedule demo call for vacuum pump", assignee: { name: "Ms. Bhargesha", initials: "MB" }, dueDate: "Today", priority: "High", status: "In Progress", completed: false },
  { id: "2", title: "Prepare quotation for Global Industries", description: "Include bulk discount options", assignee: { name: "Mr. Jigar", initials: "JG" }, dueDate: "Tomorrow", priority: "High", status: "To Do", completed: false },
  { id: "3", title: "Send product catalog to new leads", description: "Updated 2024 catalog with new products", assignee: { name: "Ms. Bhargesha", initials: "MB" }, dueDate: "23 Jan 2024", priority: "Medium", status: "Completed", completed: true },
  { id: "4", title: "Review pending orders", description: "Check inventory for order fulfillment", assignee: { name: "Mr. Jigar", initials: "JG" }, dueDate: "20 Jan 2024", priority: "High", status: "Overdue", completed: false },
  { id: "5", title: "Update customer database", description: "Add new contact information", assignee: { name: "Ms. Bhargesha", initials: "MB" }, dueDate: "25 Jan 2024", priority: "Low", status: "To Do", completed: false },
];

const getPriorityConfig = (priority: Task["priority"]) => {
  switch (priority) {
    case "High": return { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" };
    case "Medium": return { color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    default: return { color: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/20" };
  }
};

const getStatusConfig = (status: Task["status"]) => {
  switch (status) {
    case "Completed": return { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 };
    case "In Progress": return { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Clock };
    case "Overdue": return { color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertTriangle };
    default: return { color: "bg-muted text-muted-foreground border-muted", icon: Circle };
  }
};

const TasksPage = () => {
  const [taskList, setTaskList] = useState(tasks);

  const toggleTask = (id: string) => {
    setTaskList(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed, status: !t.completed ? "Completed" : "To Do" } : t
    ));
  };

  return (
    <DashboardLayout title="Tasks">
      {/* Task Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Tasks", value: "48", color: "primary" },
          { label: "Completed", value: "23", color: "emerald-500" },
          { label: "In Progress", value: "15", color: "blue-500" },
          { label: "Overdue", value: "5", color: "destructive" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 relative">
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tasks List */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Task Management</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {taskList.map((task, index) => {
            const priorityConfig = getPriorityConfig(task.priority);
            const statusConfig = getStatusConfig(task.status as Task["status"]);
            return (
              <div 
                key={task.id}
                className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md animate-fade-in ${task.completed ? 'bg-muted/30 opacity-60' : 'bg-card hover:bg-muted/20'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1 h-5 w-5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </h3>
                      <Badge variant="outline" className={`${priorityConfig.bg} ${priorityConfig.color} ${priorityConfig.border} gap-1`}>
                        <Flag className="h-3 w-3" />
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className={`${statusConfig.color} gap-1`}>
                        <statusConfig.icon className="h-3 w-3" />
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">{task.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{task.assignee.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TasksPage;
