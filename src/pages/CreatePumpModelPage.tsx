import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
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
import { usePumpModelsByOem, useCreatePumpModel, useDeletePumpModel } from "@/hooks/use-database";
import { useFieldManufacturers, useFieldPumpTypes } from "@/hooks/use-field-hooks";
import { toast } from "sonner";

interface ModelRow {
  id?: number;
  model_no: string;
  model_qty: number;
}

export default function CreatePumpModelPage() {
  const navigate = useNavigate();
  const { oemId, pumpTypeId } = useParams();
  const isEditMode = Boolean(oemId && pumpTypeId);

  const [selectedOemId, setSelectedOemId] = useState(oemId || "");
  const [selectedPumpTypeId, setSelectedPumpTypeId] = useState(pumpTypeId || "");
  const [modelRows, setModelRows] = useState<ModelRow[]>([{ model_no: "", model_qty: 1 }]);

  const { data: manufacturers = [] } = useFieldManufacturers();
  const { data: pumpTypes = [] } = useFieldPumpTypes();
  const { data: existingModels = [] } = usePumpModelsByOem(Number(oemId));
  const createMutation = useCreatePumpModel();
  const deleteMutation = useDeletePumpModel();

  useEffect(() => {
    if (isEditMode && existingModels.length > 0) {
      // Filter existing models by pump type
      const filteredModels = existingModels.filter(
        m => m.pump_type_id === Number(pumpTypeId)
      );
      if (filteredModels.length > 0) {
        setModelRows(
          filteredModels.map(m => ({
            id: m.id,
            model_no: m.model_no,
            model_qty: m.model_qty || 1,
          }))
        );
      }
    }
  }, [isEditMode, existingModels, pumpTypeId]);

  const handleAddRow = () => {
    setModelRows([...modelRows, { model_no: "", model_qty: 1 }]);
  };

  const handleRemoveRow = async (index: number) => {
    const row = modelRows[index];
    if (row.id) {
      // Delete from database if it has an ID
      try {
        await deleteMutation.mutateAsync(row.id);
        toast.success("Model deleted");
      } catch (error) {
        console.error("Failed to delete model:", error);
        toast.error("Failed to delete model");
        return;
      }
    }
    const newRows = modelRows.filter((_, i) => i !== index);
    setModelRows(newRows.length > 0 ? newRows : [{ model_no: "", model_qty: 1 }]);
  };

  const handleModelChange = (index: number, field: keyof ModelRow, value: string | number) => {
    const newRows = [...modelRows];
    newRows[index] = { ...newRows[index], [field]: value };
    setModelRows(newRows);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOemId || !selectedPumpTypeId) {
      toast.error("Please select OEM and Pump Type");
      return;
    }

    const validRows = modelRows.filter(row => row.model_no.trim());
    if (validRows.length === 0) {
      toast.error("Please add at least one model");
      return;
    }

    try {
      // Create all models
      for (const row of validRows) {
        if (!row.id) {
          // Only create new rows (ones without id)
          await createMutation.mutateAsync({
            oem_id: parseInt(selectedOemId),
            pump_type_id: parseInt(selectedPumpTypeId),
            model_no: row.model_no,
            model_qty: row.model_qty,
          });
        }
      }
      toast.success("Pump models saved successfully");
      navigate("/settings/fields/pump-models");
    } catch (error) {
      console.error("Failed to save pump models:", error);
      toast.error("Failed to save pump models");
    }
  };

  return (
    <DashboardLayout
      title="CREATE"
      breadcrumb={[
        { label: "Pump Model", path: "/settings/fields/pump-models" },
        { label: "Create", path: "" },
      ]}
    >
      <div className="space-y-6">
        <Button
          onClick={() => navigate("/settings/fields/pump-models")}
          variant="default"
          className="bg-purple-600 hover:bg-purple-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="oem">OEM</Label>
                  <Select
                    value={selectedOemId}
                    onValueChange={setSelectedOemId}
                    disabled={isEditMode}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select OEM" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer.id} value={manufacturer.id.toString()}>
                          {manufacturer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pumpType">Pump Type</Label>
                  <Select
                    value={selectedPumpTypeId}
                    onValueChange={setSelectedPumpTypeId}
                    disabled={isEditMode}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Pump Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {pumpTypes.map((pumpType) => (
                        <SelectItem key={pumpType.id} value={pumpType.id.toString()}>
                          {pumpType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Pump Models</Label>
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-[1fr_150px_80px] gap-4 bg-gray-50 p-3 font-medium text-sm border-b">
                    <div>Model No</div>
                    <div>Model Qty</div>
                    <div>Action</div>
                  </div>
                  <div className="divide-y">
                    {modelRows.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_150px_80px] gap-4 p-3 items-center"
                      >
                        <Input
                          value={row.model_no}
                          onChange={(e) => handleModelChange(index, "model_no", e.target.value)}
                          placeholder="Model No"
                          required
                        />
                        <Input
                          type="number"
                          min="1"
                          value={row.model_qty}
                          onChange={(e) =>
                            handleModelChange(index, "model_qty", parseInt(e.target.value) || 1)
                          }
                          placeholder="Qty"
                          required
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveRow(index)}
                          disabled={modelRows.length === 1 && !row.model_no}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleAddRow}
                  variant="default"
                  className="bg-green-500 hover:bg-green-600"
                >
                  + Add Row
                </Button>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {createMutation.isPending ? "Saving..." : "Save Models"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
