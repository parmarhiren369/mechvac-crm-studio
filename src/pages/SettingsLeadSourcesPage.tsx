import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useLeadSources, useCreateLeadSource, useUpdateLeadSource, useDeleteLeadSource } from "@/hooks/use-database";
import type { LeadSource } from "@/types/database";

const SettingsLeadSourcesPage = () => {
  return (
    <SettingsCrudPage<LeadSource>
      title="Lead Sources"
      description="Manage where leads are coming from."
      breadcrumb={[{ label: "Settings" }, { label: "Leads" }, { label: "Lead Sources" }]}
      createLabel="Add Lead Source"
      searchKeys={["name", "description", "status"]}
      defaultValues={{ name: "", description: "", status: "active" }}
      fields={[
        { key: "name", label: "Source Name", required: true },
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
        { key: "name", label: "Source" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useLeadSources}
      useCreate={useCreateLeadSource}
      useUpdate={useUpdateLeadSource}
      useDelete={useDeleteLeadSource}
    />
  );
};

export default SettingsLeadSourcesPage;
