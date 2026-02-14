import SimpleCreateFieldPage from "@/components/fields/SimpleCreateFieldPage";
import {
  useFieldIndustry,
  useCreateFieldIndustry,
  useUpdateFieldIndustry,
} from "@/hooks/use-field-hooks";

export default function CreateIndustryPage() {
  const createMutation = useCreateFieldIndustry();
  const updateMutation = useUpdateFieldIndustry();

  return (
    <SimpleCreateFieldPage
      title="CREATE"
      fieldType="Industry"
      basePath="/settings/fields/industries"
      useFieldData={useFieldIndustry}
      onCreate={createMutation.mutateAsync}
      onUpdate={updateMutation.mutateAsync}
    />
  );
}
