import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useFieldGroups, useCreateFieldGroup, useUpdateFieldGroup, useDeleteFieldGroup } from "@/hooks/use-database";
import type { FieldGroup } from "@/types/database";

const SettingsFieldGroupsPage = () => {
  return (
    <SettingsCrudPage<FieldGroup>
      title="Field Groups"
      description="Organize custom fields into groups."
      breadcrumb={[{ label: "Settings" }, { label: "Fields" }, { label: "Field Groups" }]}
      createLabel="Add Field Group"
      searchKeys={["name", "entity", "status"]}
      defaultValues={{ entity: "leads", name: "", description: "", sort_order: 1, status: "active" }}
      fields={[
        {
          key: "entity",
          label: "Entity",
          type: "select",
          options: [
            { label: "Leads", value: "leads" },
            { label: "Clients", value: "clients" },
            { label: "Orders", value: "orders" },
            { label: "Quotations", value: "quotations" },
            { label: "Products", value: "products" },
            { label: "Services", value: "services" },
          ],
        },
        { key: "name", label: "Group Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "sort_order", label: "Sort Order", type: "number" },
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
        { key: "name", label: "Group" },
        { key: "entity", label: "Entity" },
        { key: "sort_order", label: "Order" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useFieldGroups}
      useCreate={useCreateFieldGroup}
      useUpdate={useUpdateFieldGroup}
      useDelete={useDeleteFieldGroup}
    />
  );
};

export default SettingsFieldGroupsPage;
