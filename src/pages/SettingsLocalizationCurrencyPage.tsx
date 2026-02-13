import { SettingsCrudPage, statusBadge } from "@/components/settings/SettingsCrudPage";
import { useLocalizationCurrencies, useCreateLocalizationCurrency, useUpdateLocalizationCurrency, useDeleteLocalizationCurrency } from "@/hooks/use-database";
import type { LocalizationCurrency } from "@/types/database";

const SettingsLocalizationCurrencyPage = () => {
  return (
    <SettingsCrudPage<LocalizationCurrency>
      title="Currency"
      description="Manage currency formats and symbols."
      breadcrumb={[{ label: "Settings" }, { label: "Localization" }, { label: "Currency" }]}
      createLabel="Add Currency"
      searchKeys={["name", "code", "symbol"]}
      defaultValues={{ name: "", code: "", symbol: "", is_default: false, status: "active" }}
      fields={[
        { key: "name", label: "Currency", required: true },
        { key: "code", label: "Code", required: true, placeholder: "INR" },
        { key: "symbol", label: "Symbol", placeholder: "Rs" },
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
        { key: "name", label: "Currency" },
        { key: "code", label: "Code" },
        { key: "symbol", label: "Symbol" },
        {
          key: "is_default",
          label: "Default",
          render: (item) => (item.is_default ? "Yes" : "No"),
        },
        { key: "status", label: "Status", render: (item) => statusBadge(item.status) },
      ]}
      useList={useLocalizationCurrencies}
      useCreate={useCreateLocalizationCurrency}
      useUpdate={useUpdateLocalizationCurrency}
      useDelete={useDeleteLocalizationCurrency}
    />
  );
};

export default SettingsLocalizationCurrencyPage;
