import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateRole, useUpdateRole, useRole } from "@/hooks/use-database";
import { RolePermissions } from "@/types/database";

const PERMISSION_GROUPS = [
  {
    key: "role",
    label: "Role",
    permissions: ["Role List", "Role Create", "Role Edit", "Role Delete"],
  },
  {
    key: "lead",
    label: "Lead",
    permissions: [
      "Lead List Global",
      "Lead List",
      "Lead Create",
      "Lead Edit",
      "Lead Delete",
    ],
  },
  {
    key: "staff",
    label: "Staff",
    permissions: ["Staff List", "Staff Create", "Staff Edit", "Staff Delete"],
  },
  {
    key: "services",
    label: "Services",
    permissions: [
      "Services List",
      "Services Edit",
      "Services Delete",
      "Services Create",
    ],
  },
  {
    key: "quotation",
    label: "Quotation",
    permissions: [
      "Quotation List",
      "Quotation Create",
      "Quotation Edit",
      "Quotation Delete",
    ],
  },
  {
    key: "order",
    label: "Order",
    permissions: ["Order List", "Order Create", "Order Edit", "Order Delete"],
  },
  {
    key: "product",
    label: "Product",
    permissions: [
      "Product List",
      "Product Create",
      "Product Edit",
      "Product Delete",
    ],
  },
  {
    key: "company",
    label: "Company",
    permissions: [
      "Company List",
      "Company Create",
      "Company Edit",
      "Company Delete",
    ],
  },
  {
    key: "task",
    label: "Task",
    permissions: ["Task List", "Task Create", "Task Edit", "Task Delete"],
  },
  {
    key: "calendar",
    label: "Calendar",
    permissions: [
      "Calendar List",
      "Calendar Create",
      "Calendar Edit",
      "Calendar Delete",
    ],
  },
  {
    key: "report",
    label: "Report",
    permissions: ["Report View", "Report Export"],
  },
];

export default function CreateRolePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<RolePermissions>({});

  const { data: existingRole } = useRole(Number(id), { enabled: isEditMode });
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();

  useEffect(() => {
    if (existingRole) {
      setRoleName(existingRole.name);
      setPermissions(existingRole.permissions || {});
    }
  }, [existingRole]);

  const togglePermission = (groupKey: string, permission: string) => {
    setPermissions((prev) => {
      const group = prev[groupKey as keyof RolePermissions] || [];
      const updated = group.includes(permission)
        ? group.filter((p) => p !== permission)
        : [...group, permission];
      return { ...prev, [groupKey]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: roleName,
      permissions,
      status: "active",
    };

    if (isEditMode && id) {
      await updateMutation.mutateAsync({ id: Number(id), data });
    } else {
      await createMutation.mutateAsync(data);
    }

    navigate("/roles");
  };

  return (
    <DashboardLayout
      title={isEditMode ? "EDIT ROLE" : "CREATE"}
      breadcrumb={[
        { label: "Roles", path: "/roles" },
        { label: isEditMode ? "Edit" : "Create", path: "" },
      ]}
    >
      <div className="space-y-6">
        <Button
          onClick={() => navigate("/roles")}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Role" : "Create Role"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  placeholder="Enter role name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base">Assign Permissions</Label>

                {PERMISSION_GROUPS.map((group) => (
                  <div key={group.key} className="space-y-3">
                    <h3 className="font-semibold text-blue-600">{group.label}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {group.permissions.map((permission) => {
                        const isChecked =
                          permissions[group.key as keyof RolePermissions]?.includes(
                            permission
                          ) || false;

                        return (
                          <div
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${group.key}-${permission}`}
                              checked={isChecked}
                              onCheckedChange={() =>
                                togglePermission(group.key, permission)
                              }
                            />
                            <label
                              htmlFor={`${group.key}-${permission}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {permission}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/roles")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save Role"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
