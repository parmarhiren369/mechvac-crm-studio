import { GenericFieldPage } from "@/components/fields/GenericFieldPage";
import { useFieldPositions, useDeleteFieldPosition } from "@/hooks/use-field-hooks";

export default function PositionsPage() {
  const { data: positions = [], isLoading } = useFieldPositions();
  const deleteMutation = useDeleteFieldPosition();

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <GenericFieldPage
      title="FIELDS"
      fieldType="Position/Designation"
      basePath="/settings/fields/positions"
      data={positions}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}
