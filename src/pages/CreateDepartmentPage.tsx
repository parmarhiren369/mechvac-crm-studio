import SimpleCreateFieldPage from "@/components/fields/SimpleCreateFieldPage";
import {
  useFieldDepartment,
  useCreateFieldDepartment,
  useUpdateFieldDepartment,
} from "@/hooks/use-field-hooks";

export default function CreateDepartmentPage() {
  const createMutation = useCreateFieldDepartment();
  const updateMutation = useUpdateFieldDepartment();

  return (
    <SimpleCreateFieldPage
      title="CREATE"
      fieldType="Department"
      basePath="/settings/fields/departments"
      useFieldData={useFieldDepartment}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
