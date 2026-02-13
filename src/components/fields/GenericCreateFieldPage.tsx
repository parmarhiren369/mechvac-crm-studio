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

const COLOR_OPTIONS = [
  { value: "danger", label: "Danger" },
  { value: "success", label: "Success" },
  { value: "primary", label: "Primary" },
  { value: "info", label: "Info" },
  { value: "dark", label: "Dark" },
  { value: "warning", label: "Warning" },
];

interface FieldItem {
  id: number;
  name: string;
  value?: string;
  sort_order?: number;
  color?: string;
  status?: string;
}

interface CreateFieldPageProps {
  title: string;
  basePath: string;
  existingData?: FieldItem | null;
  isLoading?: boolean;
  onCreate: (data: Partial<FieldItem>) => Promise<void>;
  onUpdate: (id: number, data: Partial<FieldItem>) => Promise<void>;
}

export default function GenericCreateFieldPage({
  title,
  basePath,
  existingData,
  isLoading,
  onCreate,
  onUpdate,
}: CreateFieldPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [color, setColor] = useState("danger");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (existingData) {
      setName(existingData.name);
      setValue(existingData.value || "");
      setSortOrder(existingData.sort_order?.toString() || "");
      setColor(existingData.color || "danger");
    }
  }, [existingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const data = {
      name,
      value,
      sort_order: sortOrder ? parseInt(sortOrder) : undefined,
      color,
      status: "active",
    };

    try {
      if (isEditMode && id) {
        await onUpdate(Number(id), data);
      } else {
        await onCreate(data);
      }
      navigate(basePath);
    } catch (error) {
      console.error("Failed to save field:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout
      title="CREATE"
      breadcrumb={[
        { label: "Fields", path: basePath },
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
                {/* Name */}
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

                {/* Value */}
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    placeholder="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                {/* Sort Order */}
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    placeholder="Sort"
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  />
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label htmlFor="color">Color (if any)</Label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
