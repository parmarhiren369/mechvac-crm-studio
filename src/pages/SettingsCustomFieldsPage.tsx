import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useCustomFields, useCreateCustomField, useUpdateCustomField, useDeleteCustomField } from "@/hooks/use-database";
import type { CustomField } from "@/types/database";

const SettingsCustomFieldsPage = () => {
  return (
    <SettingsCrudPage<CustomField>
      title="Custom Fields"
      description="Create custom fields for different modules."
      breadcrumb={[{ label: "Settings" }, { label: "Fields" }, { label: "Custom Fields" }]}
      createLabel="Add Custom Field"
      searchKeys={["label", "field_key", "entity", "status"]}
      defaultValues={{
        entity: "leads",
        label: "",
        field_key: "",
        field_type: "text",
        is_required: false,
        options: "",
        group_id: undefined,
        status: "active",
      }}
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
        { key: "label", label: "Label", required: true },
        { key: "field_key", label: "Field Key", required: true, placeholder: "snake_case" },
        {
          key: "field_type",
          label: "Field Type",
          type: "select",
          options: [
            { label: "Text", value: "text" },
            { label: "Textarea", value: "textarea" },
            { label: "Number", value: "number" },
            { label: "Date", value: "date" },
            { label: "Select", value: "select" },
            { label: "Checkbox", value: "checkbox" },
          ],
        },
        { key: "is_required", label: "Required", type: "toggle" },
        { key: "options", label: "Options", type: "textarea", placeholder: "Comma-separated values" },
        { key: "group_id", label: "Group ID", type: "number" },
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
        { key: "label", label: "Label" },
        { key: "field_key", label: "Field Key" },
        { key: "entity", label: "Entity" },
        { key: "field_type", label: "Type" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useCustomFields}
      useCreate={useCreateCustomField}
      useUpdate={useUpdateCustomField}
      useDelete={useDeleteCustomField}
    />
  );
};

export default SettingsCustomFieldsPage;
