import GenericFieldPage from "@/components/fields/GenericFieldPage";
import { useFieldPumpTypes, useDeleteFieldPumpType } from "@/hooks/use-field-hooks";

export default function PumpTypesPage() {
  const { data: pumpTypes = [], isLoading } = useFieldPumpTypes();
  const deleteMutation = useDeleteFieldPumpType();

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <GenericFieldPage
      title="FIELDS"
      fieldType="Pump Type"
      basePath="/settings/fields/pump-types"
      data={pumpTypes}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}
