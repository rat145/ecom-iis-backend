"use client"
import { useContext } from "react";
import { Col } from "reactstrap";
import { ReactstrapInput } from "@/components/reactstrapFormik";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import { UpdatePasswordSchema } from "@/utils/hooks/auth/useUpdatePassword";
import { useTranslation } from "@/app/i18n/client";
import { Field, Form, Formik } from "formik";

const UpdatePassword = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <div className="box-wrapper">
        <LoginBoxWrapper>
          <div className="log-in-title">
            <h4>{t("UpdatePassword")}</h4>
          </div>
          <div className="input-box">
            <Formik
              initialValues={{
                password: "",
                password_confirmation: "",
              }}
              validationSchema={UpdatePasswordSchema}
              onSubmit={() => {
                router.push(`/${i18Lang}/auth/login`)
              }}>
              {() => (
                <Form className="row g-2">
                  <Col sm="12">
                    <Field name="password" component={ReactstrapInput} type="password" className="form-control" id="password" placeholder="Password" label="Password" />
                  </Col>
                  <Col sm="12">
                    <Field name="password_confirmation" component={ReactstrapInput} type="password" className="form-control" id="password" placeholder="Confirm Password" label="ConfirmPassword" />
                  </Col>
                  <Col sm="12">
                    <Btn title="Submit" className="btn btn-animation w-100 justify-content-center" type="submit" color="false"  />
                  </Col>
                </Form>
              )}
            </Formik>
          </div>
        </LoginBoxWrapper>
      </div>
    </>
  );
};
export default UpdatePassword;
