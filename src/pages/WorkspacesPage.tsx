import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWorkspaces, useDeleteWorkspace } from "@/hooks/use-database";

export default function WorkspacesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: workspaces = [], isLoading } = useWorkspaces();
  const deleteMutation = useDeleteWorkspace();

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const getRelativeTime = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMonths = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const diffInYears = Math.floor(diffInMonths / 12);
    
    if (diffInYears > 0) {
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
      return "Recently";
    }
  };

  return (
    <DashboardLayout
      title="WORKSPACES"
      breadcrumb={[
        { label: "App", path: "/" },
        { label: "Workspaces", path: "/workspaces" },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={() => navigate("/workspaces/create")}
            className="bg-green-500 hover:bg-green-600"
          >
            + Add
          </Button>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredWorkspaces.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No workspaces found
                  </TableCell>
                </TableRow>
              ) : (
                filteredWorkspaces.map((workspace) => (
                  <TableRow key={workspace.id}>
                    <TableCell className="font-medium">{workspace.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-600 hover:bg-green-100 uppercase"
                      >
                        {workspace.status || "ACTIVE"}
                      </Badge>
                    </TableCell>
                    <TableCell>{getRelativeTime(workspace.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => navigate(`/workspaces/edit/${workspace.id}`)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => setDeleteId(workspace.id)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination placeholders */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" disabled>
            Previous
          </Button>
          <Button variant="ghost" className="text-blue-600">
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
