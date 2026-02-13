import GenericCreateFieldPage from "@/components/fields/GenericCreateFieldPage";
import {
  useFieldUnit,
  useCreateFieldUnit,
  useUpdateFieldUnit,
} from "@/hooks/use-field-hooks";

export default function CreateUnitPage() {
  const createMutation = useCreateFieldUnit();
  const updateMutation = useUpdateFieldUnit();

  return (
    <GenericCreateFieldPage
      title="CREATE"
      fieldType="Unit"
      basePath="/settings/fields/units"
      useFieldData={useFieldUnit}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
