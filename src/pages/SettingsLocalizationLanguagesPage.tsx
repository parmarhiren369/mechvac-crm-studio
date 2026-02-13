import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useLocalizationLanguages, useCreateLocalizationLanguage, useUpdateLocalizationLanguage, useDeleteLocalizationLanguage } from "@/hooks/use-database";
import type { LocalizationLanguage } from "@/types/database";

const SettingsLocalizationLanguagesPage = () => {
  return (
    <SettingsCrudPage<LocalizationLanguage>
      title="Languages"
      description="Manage available application languages."
      breadcrumb={[{ label: "Settings" }, { label: "Localization" }, { label: "Languages" }]}
      createLabel="Add Language"
      searchKeys={["name", "code", "status"]}
      defaultValues={{ name: "", code: "", is_default: false, status: "active" }}
      fields={[
        { key: "name", label: "Language", required: true },
        { key: "code", label: "Code", required: true, placeholder: "en" },
        { key: "is_default", label: "Default", type: "toggle" },
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
        { key: "name", label: "Language" },
        { key: "code", label: "Code" },
        {
          key: "is_default",
          label: "Default",
          render: (item) => (item.is_default ? "Yes" : "No"),
        },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useLocalizationLanguages}
      useCreate={useCreateLocalizationLanguage}
      useUpdate={useUpdateLocalizationLanguage}
      useDelete={useDeleteLocalizationLanguage}
    />
  );
};

export default SettingsLocalizationLanguagesPage;
