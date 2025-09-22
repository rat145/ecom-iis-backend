"use client";
import TagForm from "@/components/tag/TagForm";
import FormWrapper from "@/utils/hoc/FormWrapper";

const TagsCreate = () => {
  return (
    <FormWrapper title="AddTag">
      <TagForm type={"post"} />
    </FormWrapper>
  );
};

export default TagsCreate;
