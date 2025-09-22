"use client";
import AttributeForm from "@/components/attribute/AttributeForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const UpdateAttributes = () => {
  const params = useParams();

  return (
    params?.updateId && (
      <FormWrapper title="UpdateAttribute">
        <AttributeForm updateId={params?.updateId} />
      </FormWrapper>
    )
  );
};

export default UpdateAttributes;
