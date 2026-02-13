import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useWorkspaces, useCreateWorkspace, useUpdateWorkspace, useDeleteWorkspace } from "@/hooks/use-database";
import type { Workspace } from "@/types/database";

const SettingsWorkspacesPage = () => {
  return (
    <SettingsCrudPage<Workspace>
      title="Workspaces"
      description="Create and manage workspaces."
      breadcrumb={[{ label: "Settings" }, { label: "Workspaces" }]}
      createLabel="Add Workspace"
      searchKeys={["name", "slug", "timezone"]}
      defaultValues={{ name: "", slug: "", timezone: "", status: "active" }}
      fields={[
        { key: "name", label: "Workspace Name", required: true },
        { key: "slug", label: "Slug" },
        { key: "timezone", label: "Timezone", placeholder: "Asia/Kolkata" },
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
        { key: "name", label: "Workspace" },
        { key: "slug", label: "Slug" },
        { key: "timezone", label: "Timezone" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useWorkspaces}
      useCreate={useCreateWorkspace}
      useUpdate={useUpdateWorkspace}
      useDelete={useDeleteWorkspace}
    />
  );
};

export default SettingsWorkspacesPage;
