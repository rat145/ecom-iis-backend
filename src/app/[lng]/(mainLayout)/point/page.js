'use client'
import SelectUser from "@/components/wallet/SelectUser";
import SeleteWalletPrice from "@/components/wallet/SeleteWalletPrice";
import UserTransactionsTable from "@/components/wallet/UserTransactionsTable";
import I18NextContext from "@/helper/i18NextContext";
import { PointUserTransations } from "@/utils/axiosUtils/API";
import usePermissionCheck from "@/utils/hooks/usePermissionCheck";
import { YupObject, nameSchema } from "@/utils/validation/ValidationSchemas";
import { useTranslation } from "@/app/i18n/client";
import { Form, Formik } from "formik";
import { useContext, useRef, useState } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";

const Point = () => {
  const [isValue, setIsValue] = useState("");
  const [credit, debit] = usePermissionCheck(["credit", "debit"]);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const refRefetch = useRef();

  return (
    <div className="save-back-button">
      <Formik
        initialValues={{
          consumer_id: "",
          showBalance: "",
          balance: "",
        }}
        validationSchema={YupObject({ consumer_id: nameSchema })}
        onSubmit={(values, { setFieldValue }) => {
          if (isValue == "credit") {
            //Put Your Logic Here
          } else {
            //Put Your Logic Here
          }
          setFieldValue("balance", "");
        }}
      >
        {({ values, handleSubmit, setFieldValue, errors }) => (
          <>
            <Form>
              <Row>
                <SelectUser title={t("SelectCustomer")} values={values} setFieldValue={setFieldValue} errors={errors} name={"consumer_id"} role="consumer" />
                <SeleteWalletPrice values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setIsValue={setIsValue}  title={t("Point")} description={t("PointBalance")} selectUser={"consumer_id"} icon={<RiCoinsLine />} isCredit={credit} isDebit={debit} />
              </Row>
            </Form>
            <Col sm="12">{values["consumer_id"] !== "" && <UserTransactionsTable url={values["consumer_id"] ? PointUserTransations : ""} moduleName="UserTransations" setFieldValue={setFieldValue} userIdParams={true} ref={refRefetch} dateRange={true} paramsProps={{ consumer_id: values["consumer_id"] ? values["consumer_id"] : null }} />}</Col>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Point;