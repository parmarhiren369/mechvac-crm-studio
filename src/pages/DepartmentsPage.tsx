import GenericFieldPage from "@/components/fields/GenericFieldPage";
import { useFieldDepartments, useDeleteFieldDepartment } from "@/hooks/use-field-hooks";

export default function DepartmentsPage() {
  const { data: departments = [], isLoading } = useFieldDepartments();
  const deleteMutation = useDeleteFieldDepartment();

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <GenericFieldPage
      title="FIELDS"
      fieldType="Department"
      basePath="/settings/fields/departments"
      data={departments}
      isLoading={isLoading}
      onDelete={handleDelete}
    />
  );
}
