"use client";
import PermissionForm from "@/components/role/PermissionForm";
import FormWrapper from "@/utils/hoc/FormWrapper";

const Role = () => {
  return (
    <FormWrapper title="AddRole">
      <PermissionForm />
    </FormWrapper>
  );
};

export default Role;
