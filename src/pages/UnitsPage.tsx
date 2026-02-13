import GenericFieldPage from "@/components/fields/GenericFieldPage";
import { useFieldUnits, useDeleteFieldUnit } from "@/hooks/use-field-hooks";

export default function UnitsPage() {
  const { data: units = [], isLoading } = useFieldUnits();
  const deleteMutation = useDeleteFieldUnit();

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <GenericFieldPage
      title="FIELDS"
      fieldType="Unit"
      basePath="/settings/fields/units"
      data={units}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}
