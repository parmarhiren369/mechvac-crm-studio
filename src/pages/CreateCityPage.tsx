import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { citiesService, statesService } from "@/lib/database";

export default function CreateCityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();

  const [stateId, setStateId] = useState("");
  const [name, setName] = useState("");

  const { data: states = [] } = useQuery({
    queryKey: ['states'],
    queryFn: () => statesService.getAll(),
  });

  const { data: existingCity } = useQuery({
    queryKey: ['cities', Number(id)],
    queryFn: () => citiesService.getById(Number(id)),
    enabled: isEditMode,
  });

  const createMutation = useMutation({
    mutationFn: (data: { state_id: number; name: string }) => citiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { state_id: number; name: string } }) =>
      citiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });

  useEffect(() => {
    if (existingCity) {
      setStateId(existingCity.state_id?.toString() || "");
      setName(existingCity.name);
    }
  }, [existingCity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      state_id: parseInt(stateId),
      name,
    };

    try {
      if (isEditMode && id) {
        await updateMutation.mutateAsync({ id: Number(id), data });
      } else {
        await createMutation.mutateAsync(data);
      }
      navigate("/settings/localization/cities");
    } catch (error) {
      console.error("Failed to save city:", error);
    }
  };

  return (
    <DashboardLayout
      title="CREATE"
      breadcrumb={[
        { label: "City", path: "/settings/localization/cities" },
        { label: isEditMode ? "Edit" : "Create", path: "" },
      ]}
    >
      <div className="space-y-6">
        <Button
          onClick={() => navigate("/settings/localization/cities")}
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
                  <Label htmlFor="state">State</Label>
                  <Select value={stateId} onValueChange={setStateId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.id.toString()}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">City Name</Label>
                  <Input
                    id="name"
                    placeholder="City Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
