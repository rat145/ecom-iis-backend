"use client";
import StoreForm from "@/components/store/StoreForm";
import FormWrapper from "@/utils/hoc/FormWrapper";

const StoreCreate = () => {
  return (
    <FormWrapper title="AddStore">
      <StoreForm />
    </FormWrapper>
  );
};

export default StoreCreate;
