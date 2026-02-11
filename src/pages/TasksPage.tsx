import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, Flag, CheckCircle2, Circle, AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/use-database";

const getPriorityConfig = (priority?: string) => {
  switch ((priority || "").toLowerCase()) {
    case "high":
      return { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" };
    case "medium":
      return { color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    default:
      return { color: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/20" };
  }
};

const getStatusConfig = (status?: string) => {
  switch ((status || "").toLowerCase()) {
    case "completed":
      return { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 };
    case "in progress":
    case "in_progress":
      return { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Clock };
    case "overdue":
      return { color: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertTriangle };
    default:
      return { color: "bg-muted text-muted-foreground border-muted", icon: Circle };
  }
};

const TasksPage = () => {
  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    due_date: "",
  });

  const now = Date.now();
  const total = tasks?.length ?? 0;
  const completed = tasks?.filter((t) => t.completed_at || t.status === "completed").length ?? 0;
  const inProgress = tasks?.filter((t) => (t.status || "").toLowerCase().includes("progress")).length ?? 0;
  const overdue = tasks?.filter((t) => {
    if (!t.due_date) return false;
    const due = new Date(t.due_date).getTime();
    return due < now && !t.completed_at && t.status !== "completed";
  }).length ?? 0;

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      await createTask.mutateAsync({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status,
        due_date: formData.due_date || undefined,
      });
      toast.success("Task created");
      setIsCreateDialogOpen(false);
      setFormData({ title: "", description: "", priority: "medium", status: "todo", due_date: "" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to create task");
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await updateTask.mutateAsync({
        id,
        data: { status: "completed", completed_at: new Date().toISOString() },
      });
      toast.success("Task completed");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update task");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask.mutateAsync(id);
      toast.success("Task deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete task");
    }
  };

  const formatDate = (value?: string) => (value ? new Date(value).toLocaleDateString() : "—");

  return (
    <DashboardLayout title="Tasks">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Tasks", value: total, color: "primary" },
          { label: "Completed", value: completed, color: "emerald-500" },
          { label: "In Progress", value: inProgress, color: "blue-500" },
          { label: "Overdue", value: overdue, color: "destructive" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 relative">
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Task Management</CardTitle>
          <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading tasks...</div>
          ) : (tasks ?? []).length === 0 ? (
            <div className="text-center text-muted-foreground">No tasks yet.</div>
          ) : (
            (tasks ?? []).map((task, index) => {
              const priorityConfig = getPriorityConfig(task.priority);
              const statusConfig = getStatusConfig(task.status);
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md animate-fade-in ${task.completed_at ? "bg-muted/30 opacity-60" : "bg-card hover:bg-muted/20"}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className={`font-semibold ${task.completed_at ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {task.title}
                        </h3>
                        <Badge variant="outline" className={`${priorityConfig.bg} ${priorityConfig.color} ${priorityConfig.border} gap-1`}>
                          <Flag className="h-3 w-3" />
                          {task.priority || "medium"}
                        </Badge>
                        <Badge variant="outline" className={`${statusConfig.color} gap-1`}>
                          <statusConfig.icon className="h-3 w-3" />
                          {task.status || "todo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description || "—"}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(task.due_date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!task.completed_at && (
                        <Button size="sm" variant="outline" onClick={() => handleComplete(task.id)}>
                          Complete
                        </Button>
                      )}
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(task.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Create a task for your team.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createTask.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TasksPage;
