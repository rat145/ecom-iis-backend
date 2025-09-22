import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row, Col, Card } from "reactstrap";
import { ProductTabTitleListData } from "../../data/TabTitleListData";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { product } from "../../utils/axiosUtils/API";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import Loader from "../commonComponent/Loader";
import TabTitle from "../coupon/TabTitle";
import { ProductInitValues, ProductValidationSchema } from "./ProductObjects";
import ProductSubmitFunction from "./ProductSubmitFunction";
import SettingContext from "../../helper/settingContext";
import AllProductTabs from "./AllProductTabs";
import I18NextContext from "@/helper/i18NextContext";
import { useRouter } from "next/navigation";

const ProductForm = ({ setResetKey, updateId, title }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("1");
  const { state } = useContext(SettingContext)
  const { data: oldData, isLoading: oldDataLoading, refetch, status } = useQuery({queryKey: [updateId], queryFn: () => request({ url: `${product}/${updateId}` }), refetchOnWindowFocus: false, enabled: false, select: (data) => data.data });
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  const watchEvent = useCallback((oldData, updateId) => {
    return ProductInitValues(oldData, updateId)
  }, [oldData, updateId])

  if ((updateId && oldDataLoading)) return <Loader />;
  return (
    <Formik
      initialValues={{ ...watchEvent(oldData, updateId) }}
      validationSchema={YupObject({
        ...ProductValidationSchema,
        store_id: state?.isMultiVendor && nameSchema
      })}
      onSubmit={(values) => {
        if (updateId) {
          values["_method"] = "put"
        }
        ProductSubmitFunction(null, values, updateId);
        setResetKey(true)
        router.push(`/${i18Lang}/product`)
      }}>
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
          <Row>
            <Col>
              <Card>
                <div className="title-header option-title">
                  <h5>{t(title)}</h5>
                </div>
                <Row>
                  <Col xl="3" lg="4">
                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ProductTabTitleListData} errors={errors} touched={touched} />
                  </Col>
                  <AllProductTabs values={values} activeTab={activeTab} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                  <FormBtn />
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;