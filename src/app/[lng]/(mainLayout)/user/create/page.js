"use client";

import UserForm from "@/components/user/UserForm";
import FormWrapper from "@/utils/hoc/FormWrapper";

const AddNewUser = () => {
  return (
    <FormWrapper title="AddUser">
      <UserForm />
    </FormWrapper>
  );
};

export default AddNewUser;
