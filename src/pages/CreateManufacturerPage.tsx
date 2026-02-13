import GenericCreateFieldPage from "@/components/fields/GenericCreateFieldPage";
import {
  useFieldManufacturer,
  useCreateFieldManufacturer,
  useUpdateFieldManufacturer,
} from "@/hooks/use-field-hooks";

export default function CreateManufacturerPage() {
  const createMutation = useCreateFieldManufacturer();
  const updateMutation = useUpdateFieldManufacturer();

  return (
    <GenericCreateFieldPage
      title="CREATE"
      fieldType="Manufacturer (OEM)"
      basePath="/settings/fields/manufacturers"
      useFieldData={useFieldManufacturer}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
