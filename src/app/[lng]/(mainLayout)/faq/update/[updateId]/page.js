"use client";
import FaqForm from "@/components/faq/FaqForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const UpdateFaq = () => {
  const params = useParams();
  return (
    params?.updateId && (
      <FormWrapper title="Update Faq">
        <FaqForm updateId={params?.updateId} />
      </FormWrapper>
    )
  );
};

export default UpdateFaq;
