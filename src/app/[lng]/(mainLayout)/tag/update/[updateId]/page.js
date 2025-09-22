"use client";

import TagForm from "@/components/tag/TagForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const RoleUpdate = () => {
  const params = useParams();
  return (
    params?.updateId && (
      <FormWrapper title="UpdateTag">
        <TagForm updateId={params?.updateId} type={"product"} />
      </FormWrapper>
    )
  );
};

export default RoleUpdate;
