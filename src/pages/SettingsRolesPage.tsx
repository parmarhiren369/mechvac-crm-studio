import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole } from "@/hooks/use-database";
import type { Role } from "@/types/database";

const SettingsRolesPage = () => {
  return (
    <SettingsCrudPage<Role>
      title="Roles"
      description="Manage access roles and permissions."
      breadcrumb={[{ label: "Settings" }, { label: "Roles" }]}
      createLabel="Add Role"
      searchKeys={["name", "description", "status"]}
      defaultValues={{ name: "", description: "", permissions: "", status: "active" }}
      fields={[
        { key: "name", label: "Role Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "permissions", label: "Permissions", type: "textarea", placeholder: "comma-separated" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
        },
      ]}
      columns={[
        { key: "name", label: "Role" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useRoles}
      useCreate={useCreateRole}
      useUpdate={useUpdateRole}
      useDelete={useDeleteRole}
    />
  );
};

export default SettingsRolesPage;
