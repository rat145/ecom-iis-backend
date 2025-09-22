"use client";
import CurrencyForm from "@/components/currency/CurrencyForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const UpdateCurrency = () => {
  const params = useParams();

  return (
    params?.updateId && (
      <FormWrapper title="Update Currency">
        <CurrencyForm updateId={params?.updateId} />
      </FormWrapper>
    )
  );
};

export default UpdateCurrency;
