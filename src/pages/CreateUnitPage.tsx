import SimpleCreateFieldPage from "@/components/fields/SimpleCreateFieldPage";
import {
  useFieldUnit,
  useCreateFieldUnit,
  useUpdateFieldUnit,
} from "@/hooks/use-field-hooks";

export default function CreateUnitPage() {
  const createMutation = useCreateFieldUnit();
  const updateMutation = useUpdateFieldUnit();

  return (
    <SimpleCreateFieldPage
      title="CREATE"
      fieldType="Unit"
      basePath="/settings/fields/units"
      useFieldData={useFieldUnit}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
