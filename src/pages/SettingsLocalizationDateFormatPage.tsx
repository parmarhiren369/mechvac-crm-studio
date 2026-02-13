import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useLocalizationDateFormats, useCreateLocalizationDateFormat, useUpdateLocalizationDateFormat, useDeleteLocalizationDateFormat } from "@/hooks/use-database";
import type { LocalizationDateFormat } from "@/types/database";

const SettingsLocalizationDateFormatPage = () => {
  return (
    <SettingsCrudPage<LocalizationDateFormat>
      title="Date Format"
      description="Define date display formats."
      breadcrumb={[{ label: "Settings" }, { label: "Localization" }, { label: "Date Format" }]}
      createLabel="Add Date Format"
      searchKeys={["label", "format", "status"]}
      defaultValues={{ label: "", format: "", is_default: false, status: "active" }}
      fields={[
        { key: "label", label: "Label", required: true },
        { key: "format", label: "Format", required: true, placeholder: "DD/MM/YYYY" },
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
        { key: "label", label: "Label" },
        { key: "format", label: "Format" },
        {
          key: "is_default",
          label: "Default",
          render: (item) => (item.is_default ? "Yes" : "No"),
        },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useLocalizationDateFormats}
      useCreate={useCreateLocalizationDateFormat}
      useUpdate={useUpdateLocalizationDateFormat}
      useDelete={useDeleteLocalizationDateFormat}
    />
  );
};

export default SettingsLocalizationDateFormatPage;
