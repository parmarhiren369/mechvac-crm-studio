import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { usePumpModels } from "@/hooks/use-database";
import { useFieldManufacturers, useFieldPumpTypes } from "@/hooks/use-field-hooks";

export default function PumpModelsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: pumpModels = [], isLoading } = usePumpModels();
  const { data: manufacturers = [] } = useFieldManufacturers();
  const { data: pumpTypes = [] } = useFieldPumpTypes();

  // Create lookup maps for OEM and Pump Type names
  const oemMap = new Map(manufacturers.map(m => [m.id, m.name]));
  const pumpTypeMap = new Map(pumpTypes.map(pt => [pt.id, pt.name]));

  // Group pump models by OEM and Pump Type
  const groupedModels = pumpModels.reduce((acc, model) => {
    const key = `${model.oem_id}_${model.pump_type_id}`;
    if (!acc[key]) {
      acc[key] = {
        oem_id: model.oem_id,
        pump_type_id: model.pump_type_id,
        oem_name: oemMap.get(model.oem_id || 0) || "",
        pump_type_name: pumpTypeMap.get(model.pump_type_id || 0) || "",
        models: [],
      };
    }
    acc[key].models.push(model);
    return acc;
  }, {} as Record<string, { oem_id?: number; pump_type_id?: number; oem_name: string; pump_type_name: string; models: any[] }>);

  const groupedArray = Object.values(groupedModels);

  // Filter by search term (OEM or Pump Type)
  const filteredGroups = groupedArray.filter(group =>
    group.oem_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.pump_type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="ALL PUMP MODELS"
      breadcrumb={[
        { label: "Pump Models", path: "/settings/fields/pump-models" },
        { label: "All Pump Models", path: "/settings/fields/pump-models" },
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-lg font-medium">Pump Model</div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search OEM or Pump Type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button
              onClick={() => navigate("/settings/fields/pump-models/create")}
              className="bg-green-500 hover:bg-green-600"
            >
              + Create Pump Model
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OEM</TableHead>
                <TableHead>Pump Type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredGroups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No pump models found
                  </TableCell>
                </TableRow>
              ) : (
                filteredGroups.map((group, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{group.oem_name}</TableCell>
                    <TableCell>{group.pump_type_name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => navigate(`/settings/fields/pump-models/view/${group.oem_id}/${group.pump_type_id}`)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-purple-500 hover:bg-purple-600"
                          onClick={() => navigate(`/settings/fields/pump-models/edit/${group.oem_id}/${group.pump_type_id}`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
