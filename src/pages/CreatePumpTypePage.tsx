import SimpleCreateFieldPage from "@/components/fields/SimpleCreateFieldPage";
import {
  useFieldPumpType,
  useCreateFieldPumpType,
  useUpdateFieldPumpType,
} from "@/hooks/use-field-hooks";

export default function CreatePumpTypePage() {
  const createMutation = useCreateFieldPumpType();
  const updateMutation = useUpdateFieldPumpType();

  return (
    <SimpleCreateFieldPage
      title="CREATE"
      fieldType="Pump Type"
      basePath="/settings/fields/pump-types"
      useFieldData={useFieldPumpType}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
