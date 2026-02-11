import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { clearAllData, getTablesToClear } from "@/lib/data-reset";

export default function SettingsProfilePage() {
  const [confirmText, setConfirmText] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const tables = getTablesToClear();

  const handleClearAllData = async () => {
    if (confirmText !== "DELETE") {
      toast.error("Type DELETE to confirm");
      return;
    }

    setIsClearing(true);
    try {
      const results = await clearAllData();
      const failed = results.filter((r) => r.error);

      if (failed.length > 0) {
        toast.error("Some tables could not be cleared. Check permissions.");
      } else {
        toast.success("All data cleared successfully.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to clear data");
    } finally {
      setIsClearing(false);
      setConfirmText("");
    }
  };

  return (
    <DashboardLayout title="Settings" breadcrumb={[{ label: "Settings" }, { label: "Profile" }]}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Delete all dummy data from the application. This cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>What gets deleted</AlertTitle>
              <AlertDescription>
                This will delete data from the following tables: {tables.join(", ")}
              </AlertDescription>
            </Alert>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete all data</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently remove all
                    records from the selected tables.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Type <strong>DELETE</strong> to confirm.
                  </p>
                  <Input
                    value={confirmText}
                    onChange={(event) => setConfirmText(event.target.value)}
                    placeholder="DELETE"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAllData}
                    disabled={isClearing || confirmText !== "DELETE"}
                  >
                    {isClearing ? "Deleting..." : "Confirm delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
