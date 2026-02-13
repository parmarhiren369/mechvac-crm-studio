import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useInspectionChecklists, useCreateInspectionChecklist, useUpdateInspectionChecklist, useDeleteInspectionChecklist } from "@/hooks/use-database";
import type { InspectionChecklist } from "@/types/database";

const SettingsInspectionChecklistsPage = () => {
  return (
    <SettingsCrudPage<InspectionChecklist>
      title="Inspection Checklists"
      description="Create checklist items for templates."
      breadcrumb={[{ label: "Settings" }, { label: "Inspection Reports" }, { label: "Checklists" }]}
      createLabel="Add Checklist"
      searchKeys={["title", "status"]}
      defaultValues={{ template_id: undefined, title: "", items: "", status: "active" }}
      fields={[
        { key: "template_id", label: "Template ID", type: "number" },
        { key: "title", label: "Title", required: true },
        { key: "items", label: "Items", type: "textarea", placeholder: "One item per line" },
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
        { key: "title", label: "Checklist" },
        { key: "template_id", label: "Template ID" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useInspectionChecklists}
      useCreate={useCreateInspectionChecklist}
      useUpdate={useUpdateInspectionChecklist}
      useDelete={useDeleteInspectionChecklist}
    />
  );
};

export default SettingsInspectionChecklistsPage;
