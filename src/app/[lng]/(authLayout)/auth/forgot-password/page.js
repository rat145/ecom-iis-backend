"use client";
import { ReactstrapInput } from "@/components/reactstrapFormik";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import { ForgotPasswordSchema,} from "@/utils/hooks/auth/useForgotPassword";
import { useTranslation } from "@/app/i18n/client";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Col } from "reactstrap";

const ForgotPassword = () => {
  const router = useRouter()
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  return (
    <div className="box-wrapper">
      <LoginBoxWrapper>
        <div className="log-in-title">
          <h4>{t("ForgotPassword")}</h4>
        </div>
        <div className="input-box">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => router.push(`/${i18Lang}/auth/otp-verification`)}
          >
            {() => (
              <Form className="row g-2">
                <Col sm="12">
                  <Field
                    name="email"
                    component={ReactstrapInput}
                    className="form-control"
                    id="email"
                    placeholder="Email Address"
                    label="EmailAddress"
                  />
                </Col>
                <Col sm="12">
                  <Btn
                    title="SendEmail"
                    className="btn btn-animation w-100 justify-content-center"
                    type="submit"
                    color="false"
                  />
                </Col>
              </Form>
            )}
          </Formik>
        </div>
      </LoginBoxWrapper>
    </div>
  );
};
export default ForgotPassword;
