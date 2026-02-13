import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { countriesService } from "@/lib/database";

export default function CreateCountryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();

  const [name, setName] = useState("");

  const { data: existingCountry } = useQuery({
    queryKey: ['countries', Number(id)],
    queryFn: () => countriesService.getById(Number(id)),
    enabled: isEditMode,
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string }) => countriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string } }) =>
      countriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });

  useEffect(() => {
    if (existingCountry) {
      setName(existingCountry.name);
    }
  }, [existingCountry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode && id) {
        await updateMutation.mutateAsync({ id: Number(id), data: { name } });
      } else {
        await createMutation.mutateAsync({ name });
      }
      navigate("/settings/localization/countries");
    } catch (error) {
      console.error("Failed to save country:", error);
    }
  };

  return (
    <DashboardLayout
      title="CREATE"
      breadcrumb={[
        { label: "Country", path: "/settings/localization/countries" },
        { label: isEditMode ? "Edit" : "Create", path: "" },
      ]}
    >
      <div className="space-y-6">
        <Button
          onClick={() => navigate("/settings/localization/countries")}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Country Name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
