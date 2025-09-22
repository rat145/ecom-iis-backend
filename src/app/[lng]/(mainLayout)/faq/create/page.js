"use client";
import FaqForm from "@/components/faq/FaqForm";
import FormWrapper from "@/utils/hoc/FormWrapper";

const CreateFaq = () => {
  return (
    <FormWrapper title="AddFaq">
      <FaqForm />
    </FormWrapper>
  );
};

export default CreateFaq;
