import GenericFieldPage from "@/components/fields/GenericFieldPage";
import { useFieldIndustries, useDeleteFieldIndustry } from "@/hooks/use-field-hooks";

export default function IndustriesPage() {
  const { data: industries = [], isLoading } = useFieldIndustries();
  const deleteMutation = useDeleteFieldIndustry();

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <GenericFieldPage
      title="FIELDS"
      fieldType="Industry"
      basePath="/settings/fields/industries"
      data={industries}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}
