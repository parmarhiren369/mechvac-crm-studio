import GenericFieldPage from "@/components/fields/GenericFieldPage";
import { useFieldPumpModels, useDeleteFieldPumpModel } from "@/hooks/use-field-hooks";

export default function PumpModelsPage() {
  const { data: pumpModels = [], isLoading } = useFieldPumpModels();
  const deleteMutation = useDeleteFieldPumpModel();

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <GenericFieldPage
      title="FIELDS"
      fieldType="Pump Model Details"
      basePath="/settings/fields/pump-models"
      data={pumpModels}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}
