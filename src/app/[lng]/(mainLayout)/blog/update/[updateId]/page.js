"use client";

import BlogForm from "@/components/blog/BlogForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const BlogUpdate = () => {
  const params = useParams();

  return (
    params?.updateId && (
      <FormWrapper title="UpdateBlog">
        <BlogForm updateId={params?.updateId} />
      </FormWrapper>
    )
  );
};

export default BlogUpdate;
