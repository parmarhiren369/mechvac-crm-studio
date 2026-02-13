import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useLeadStatuses, useCreateLeadStatus, useUpdateLeadStatus, useDeleteLeadStatus } from "@/hooks/use-database";
import type { LeadStatus } from "@/types/database";

const SettingsLeadStatusPage = () => {
  return (
    <SettingsCrudPage<LeadStatus>
      title="Lead Status"
      description="Define pipeline stages and colors."
      breadcrumb={[{ label: "Settings" }, { label: "Leads" }, { label: "Lead Status" }]}
      createLabel="Add Lead Status"
      searchKeys={["name", "status"]}
      defaultValues={{ name: "", color: "#0ea5e9", stage_order: 1, status: "active" }}
      fields={[
        { key: "name", label: "Status Name", required: true },
        { key: "color", label: "Color", type: "color" },
        { key: "stage_order", label: "Order", type: "number" },
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
        { key: "name", label: "Status" },
        {
          key: "color",
          label: "Color",
          render: (item) => (
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color || "#0ea5e9" }}></span>
              <span>{item.color || "#0ea5e9"}</span>
            </div>
          ),
        },
        { key: "stage_order", label: "Order" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useLeadStatuses}
      useCreate={useCreateLeadStatus}
      useUpdate={useUpdateLeadStatus}
      useDelete={useDeleteLeadStatus}
    />
  );
};

export default SettingsLeadStatusPage;
