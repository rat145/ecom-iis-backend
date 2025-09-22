"use client";
import UserForm from "@/components/user/UserForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useParams } from "next/navigation";

const UserUpdate = () => {
  const params = useParams();
  return (
    params?.updateId && (
      <FormWrapper title="UpdateUser">
        <UserForm updateId={params?.updateId} />
      </FormWrapper>
    )
  );
};

export default UserUpdate;
