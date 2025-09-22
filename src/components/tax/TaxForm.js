import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { tax } from "../../utils/axiosUtils/API";
import { nameSchema, roleIdSchema, YupObject } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/helper/i18NextContext";
import { useRouter } from "next/navigation";

const TaxForm = ({ updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const { data: oldData, isLoading, refetch } = useQuery({queryKey: [updateId], queryFn: () => request({ url: tax + "/" + updateId }), refetchOnMount: false, enabled: false });
  const router =useRouter()
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isLoading) return <Loader />

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        rate: updateId ? oldData?.data?.rate || "" : "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
      }}
      validationSchema={YupObject({
        name: nameSchema,
        rate: roleIdSchema,
      })}
      onSubmit={() => {
        // Put Add Or Update Logic Here
         router.push(`/${i18Lang}/tax`)
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <SimpleInputField nameList={[{ name: "name", placeholder: t("EnterTaxTitle"), require: "true" }, { name: "rate", type: "number", placeholder: t("EnterRate"), require: "true", inputaddon: "true", postprefix: "%", min: "0", max: "100" }]} />
          <CheckBoxField name="status" />
          <FormBtn />
        </Form>
      )}
    </Formik>
  );
};

export default TaxForm;
