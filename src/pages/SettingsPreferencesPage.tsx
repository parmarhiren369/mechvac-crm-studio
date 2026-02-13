import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { usePreferences, useCreatePreference, useUpdatePreference, useDeletePreference } from "@/hooks/use-database";
import type { Preference } from "@/types/database";

const SettingsPreferencesPage = () => {
  return (
    <SettingsCrudPage<Preference>
      title="Preferences"
      description="Manage global and user preferences."
      breadcrumb={[{ label: "Settings" }, { label: "Preferences" }]}
      createLabel="Add Preference"
      searchKeys={["key", "value", "scope"]}
      defaultValues={{ key: "", value: "", description: "", scope: "app", status: "active" }}
      fields={[
        { key: "key", label: "Key", required: true },
        { key: "value", label: "Value" },
        { key: "description", label: "Description", type: "textarea" },
        {
          key: "scope",
          label: "Scope",
          type: "select",
          options: [
            { label: "App", value: "app" },
            { label: "User", value: "user" },
          ],
        },
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
        { key: "key", label: "Key" },
        { key: "value", label: "Value" },
        { key: "scope", label: "Scope" },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={usePreferences}
      useCreate={useCreatePreference}
      useUpdate={useUpdatePreference}
      useDelete={useDeletePreference}
    />
  );
};

export default SettingsPreferencesPage;
