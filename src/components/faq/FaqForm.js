import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import { Row } from "reactstrap";
import SimpleInputField from "../inputFields/SimpleInputField";
import CheckBoxField from "../inputFields/CheckBoxField";
import FormBtn from "../../elements/buttons/FormBtn";
import Loader from "../commonComponent/Loader";
import { useQuery } from "@tanstack/react-query";
import request from "../../utils/axiosUtils";
import { FaqAPI } from "../../utils/axiosUtils/API";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";

const FaqForm = ({ updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = useRouter();
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: ["faq/id"], queryFn: () => request({ url: `${FaqAPI}/${updateId}` }), refetchOnMount: false, enabled: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isLoading) return <Loader />;
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: updateId ? oldData?.data?.title || "" : "",
        description: updateId ? oldData?.data?.description : "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
      }}
      validationSchema={YupObject({ title: nameSchema, description: nameSchema })}
      onSubmit={() => {
        // Put Add Or Update Logic Here
        router.push(`/${i18Lang}/faq`);
      }}
    >
      {() => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <SimpleInputField
              nameList={[
                { name: "title", placeholder: t("EnterTitle"), require: "true" },
                { name: "description", type: "textarea", title: "Description", placeholder: t("EnterDescription"), require: "true" },
              ]}
            />
            <CheckBoxField name="status" />
            <FormBtn />
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default FaqForm;
