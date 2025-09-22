"use client";
import PageForm from "@/components/pages/PageForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const UpdatePage = () => {
  const params = useParams();
  return (
    params?.updateId && (
      <FormWrapper title="Update Page">
        <PageForm updateId={params?.updateId} />
      </FormWrapper>
    )
  );
};

export default UpdatePage;
