import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";

interface SimpleFieldPageProps {
  title: string;
  fieldType: string;
  basePath: string;
  useFieldData: (id: number, options?: { enabled?: boolean }) => any;
  onCreate: (data: any) => Promise<any>;
  onUpdate: (params: { id: number; data: any }) => Promise<any>;
}

export default function SimpleCreateFieldPage({
  title,
  fieldType,
  basePath,
  useFieldData,
  onCreate,
  onUpdate,
}: SimpleFieldPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();

  const [name, setName] = useState("");

  const { data: existingData } = useFieldData(Number(id), { enabled: isEditMode });

  useEffect(() => {
    if (existingData) {
      setName(existingData.name || "");
    }
  }, [existingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: name.trim(),
    };

    try {
      if (isEditMode && id) {
        await onUpdate({ id: Number(id), data });
      } else {
        await onCreate(data);
      }
      navigate(basePath);
    } catch (error) {
      console.error(`Failed to save ${fieldType}:`, error);
    }
  };

  return (
    <DashboardLayout
      title={title}
      breadcrumb={[
        { label: fieldType, path: basePath },
        { label: isEditMode ? "Edit" : "Create", path: "" },
      ]}
    >
      <div className="space-y-6">
        <Button
          onClick={() => navigate(basePath)}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
