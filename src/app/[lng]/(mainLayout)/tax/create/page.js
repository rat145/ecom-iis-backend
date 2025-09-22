'use client'
import TaxForm from "@/components/tax/TaxForm";
import FormWrapper from "@/utils/hoc/FormWrapper";

const TaxCreate = () => {
  return (
    <FormWrapper title="AddTax">
      <TaxForm  />
    </FormWrapper>
  );
};

export default TaxCreate;
