import GenericCreateFieldPage from "@/components/fields/GenericCreateFieldPage";
import {
  useFieldDepartment,
  useCreateFieldDepartment,
  useUpdateFieldDepartment,
} from "@/hooks/use-field-hooks";

export default function CreateDepartmentPage() {
  const createMutation = useCreateFieldDepartment();
  const updateMutation = useUpdateFieldDepartment();

  return (
    <GenericCreateFieldPage
      title="CREATE"
      fieldType="Department"
      basePath="/settings/fields/departments"
      useFieldData={useFieldDepartment}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
