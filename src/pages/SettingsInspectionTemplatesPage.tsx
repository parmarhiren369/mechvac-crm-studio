import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useInspectionTemplates, useCreateInspectionTemplate, useUpdateInspectionTemplate, useDeleteInspectionTemplate } from "@/hooks/use-database";
import type { InspectionTemplate } from "@/types/database";

const SettingsInspectionTemplatesPage = () => {
  return (
    <SettingsCrudPage<InspectionTemplate>
      title="Inspection Templates"
      description="Define reusable inspection templates."
      breadcrumb={[{ label: "Settings" }, { label: "Inspection Reports" }, { label: "Templates" }]}
      createLabel="Add Template"
      searchKeys={["name", "description", "status"]}
      defaultValues={{ name: "", description: "", status: "active" }}
      fields={[
        { key: "name", label: "Template Name", required: true },
        { key: "description", label: "Description", type: "textarea" },
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
        { key: "name", label: "Template" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useInspectionTemplates}
      useCreate={useCreateInspectionTemplate}
      useUpdate={useUpdateInspectionTemplate}
      useDelete={useDeleteInspectionTemplate}
    />
  );
};

export default SettingsInspectionTemplatesPage;
