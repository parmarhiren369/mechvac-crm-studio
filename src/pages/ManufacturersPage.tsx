import GenericFieldPage from "@/components/fields/GenericFieldPage";
import { useFieldManufacturers, useDeleteFieldManufacturer } from "@/hooks/use-field-hooks";

export default function ManufacturersPage() {
  const { data: manufacturers = [], isLoading } = useFieldManufacturers();
  const deleteMutation = useDeleteFieldManufacturer();

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <GenericFieldPage
      title="FIELDS"
      fieldType="Manufacturer (OEM)"
      basePath="/settings/fields/manufacturers"
      data={manufacturers}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}
