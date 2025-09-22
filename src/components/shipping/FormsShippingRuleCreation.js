import { Form, Formik } from "formik";
import { useTranslation } from "@/app/i18n/client";
import { Row } from "reactstrap";
import Btn from "../../elements/buttons/Btn";
import { ifShippingTypeIsFree, nameSchema, YupObject } from "../../utils/validation/ValidationSchemas";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import DeleteButton from "../table/DeleteButton";
import FormContent from './FormContent'
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const FormsShippingRuleCreation = ({ rules, mutate, shipping_id, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: rules?.name || "",
        rule_type: rules?.rule_type || "",
        min: rules?.min || "",
        max: rules?.max || "",
        shipping_type: rules?.shipping_type || "",
        amount: rules?.amount || "",
        status: rules?.status ? Boolean(Number(rules?.status)) : true,
        shipping_id: rules ? shipping_id : shipping_id.create,
      }}
      validationSchema={YupObject({
        name: nameSchema,
        min: nameSchema,
        max: nameSchema,
        shipping_type: nameSchema,
        amount: ifShippingTypeIsFree,
        status: nameSchema,
      })}
      onSubmit={(values) => {
        if (values["shipping_type"] == "free") {
          delete values["amount"];
        }
        mutate({ ...values, status: Number(values.status) });
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <FormContent />
            {values["shipping_type"] !== "free" && <SimpleInputField nameList={[{ name: "amount", type: "number", placeholder: t("EnterAmount"), require: "true" }]} />}
            <CheckBoxField name="status" />
          </Row>
          <div className="dflex-wgap justify-content-end ms-auto mt-0 save-back-button">
            {rules?.id && <DeleteButton id={rules.id} noImage={true} />}
            <Btn className="btn-primary" type="submit" title="Save" loading={loading} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormsShippingRuleCreation;
