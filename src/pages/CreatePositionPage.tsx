import { GenericCreateFieldPage } from "@/components/fields/GenericCreateFieldPage";
import {
  useFieldPosition,
  useCreateFieldPosition,
  useUpdateFieldPosition,
} from "@/hooks/use-field-hooks";

export default function CreatePositionPage() {
  const createMutation = useCreateFieldPosition();
  const updateMutation = useUpdateFieldPosition();

  return (
    <GenericCreateFieldPage
      title="CREATE"
      fieldType="Position/Designation"
      basePath="/settings/fields/positions"
      useFieldData={useFieldPosition}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
