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
import { statesService, countriesService } from "@/lib/database";

export default function CreateStatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const queryClient = useQueryClient();

  const [countryId, setCountryId] = useState("");
  const [name, setName] = useState("");

  const { data: countries = [] } = useQuery({
    queryKey: ['countries'],
    queryFn: () => countriesService.getAll(),
  });

  const { data: existingState } = useQuery({
    queryKey: ['states', Number(id)],
    queryFn: () => statesService.getById(Number(id)),
    enabled: isEditMode,
  });

  const createMutation = useMutation({
    mutationFn: (data: { country_id: number; name: string }) => statesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { country_id: number; name: string } }) =>
      statesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
    },
  });

  useEffect(() => {
    if (existingState) {
      setCountryId(existingState.country_id?.toString() || "");
      setName(existingState.name);
    }
  }, [existingState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      country_id: parseInt(countryId),
      name,
    };

    try {
      if (isEditMode && id) {
        await updateMutation.mutateAsync({ id: Number(id), data });
      } else {
        await createMutation.mutateAsync(data);
      }
      navigate("/settings/localization/states");
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  };

  return (
    <DashboardLayout
      title="CREATE"
      breadcrumb={[
        { label: "State", path: "/settings/localization/states" },
        { label: isEditMode ? "Edit" : "Create", path: "" },
      ]}
    >
      <div className="space-y-6">
        <Button
          onClick={() => navigate("/settings/localization/states")}
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
                  <Label htmlFor="country">Country</Label>
                  <Select value={countryId} onValueChange={setCountryId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id.toString()}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">State Name</Label>
                  <Input
                    id="name"
                    placeholder="State Name"
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
