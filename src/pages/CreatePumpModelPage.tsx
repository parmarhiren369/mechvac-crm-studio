import GenericCreateFieldPage from "@/components/fields/GenericCreateFieldPage";
import {
  useFieldPumpModel,
  useCreateFieldPumpModel,
  useUpdateFieldPumpModel,
} from "@/hooks/use-field-hooks";

export default function CreatePumpModelPage() {
  const createMutation = useCreateFieldPumpModel();
  const updateMutation = useUpdateFieldPumpModel();

  return (
    <GenericCreateFieldPage
      title="CREATE"
      fieldType="Pump Model Details"
      basePath="/settings/fields/pump-models"
      useFieldData={useFieldPumpModel}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
