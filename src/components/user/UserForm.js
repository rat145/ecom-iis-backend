import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema, YupObject } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import UserDetail1 from "./UserDetail1";
import UserAddress from "./UserAddress";
import UserPassword from "./UserPassword";
import UserRole from "./UserRole";
import { useRouter } from "next/navigation";
import I18NextContext from "@/helper/i18NextContext";

const UserForm = ({ updateId, fixedRole, noRoleField, addAddress, type, setModal }) => {
  const { data: rolesData, isLoading: roleLoading, refetch: RoleRefetch } = useQuery({queryKey: ["/role"], queryFn: () => request({ url: "/role" }),
    refetchOnMount: false, enabled: false, select: (data) => data?.data?.data?.filter((elem) => elem.id !== 1 && elem.id !== 3)
  });
  const router = useRouter()
  const { i18Lang } = useContext(I18NextContext);
  const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery({queryKey: [updateId], queryFn: () => request({ url: `/user/${updateId}` }), enabled: false, refetchOnWindowFocus: false });
  useEffect(() => {
    if (updateId) {
      refetch()
    }
  }, [updateId]);
  useEffect(() => {
    RoleRefetch();
  }, []);
  if (roleLoading && (updateId && oldDataLoading)) return <Loader />;
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        email: updateId ? oldData?.data?.email || "" : "",
        phone: updateId ? Number(oldData?.data?.phone) || "" : "",
        password: "",
        password_confirmation: "",
        role_id: updateId ? Number(oldData?.data?.role?.id) || "" : fixedRole ? 2 : "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        address: [],
        country_code: updateId ? oldData?.data?.country_code || '' : "91"
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        password: !updateId && passwordSchema,
        password_confirmation: !updateId && passwordConfirmationSchema,
        role_id: noRoleField ? null : nameSchema,
      })}
      onSubmit={(values) => {
        // Put Add Or Update Logic Here
        router.push(`/${i18Lang}/user`)
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            {!addAddress && (
              <>
                <UserDetail1 />
                <UserPassword updateId={updateId} />
                {noRoleField ? '' : <UserRole rolesData={rolesData} />}
              </>
            )}
            <UserAddress addAddress={addAddress} type={type} />
            <FormBtn />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
