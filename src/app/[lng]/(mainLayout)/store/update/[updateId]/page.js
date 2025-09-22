"use client";

import StoreForm from "@/components/store/StoreForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const StoreUpdate = () => {
  const params = useParams();
  return (
    params?.updateId && (
      <FormWrapper title="UpdateStore">
        <StoreForm updateId={params?.updateId} />
      </FormWrapper>
    )
  );
};

export default StoreUpdate;
