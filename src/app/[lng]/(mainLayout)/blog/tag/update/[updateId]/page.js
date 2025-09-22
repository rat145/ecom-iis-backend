"use client";
import TagForm from "@/components/tag/TagForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const BlogTagUpdate = () => {
  const params = useParams();

  return (
    params?.updateId && (
      <FormWrapper title="UpdateTag">
        <TagForm updateId={params?.updateId} type={"post"} />
      </FormWrapper>
    )
  );
};

export default BlogTagUpdate;
