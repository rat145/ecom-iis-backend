"use client";
import BlogForm from "@/components/blog/BlogForm";
import FormWrapper from "@/utils/hoc/FormWrapper";

const AddBlog = () => {
  return (
    <FormWrapper title="AddBlog">
      <BlogForm />
    </FormWrapper>
  );
};

export default AddBlog;
