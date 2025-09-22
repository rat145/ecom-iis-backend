"use client"
import React, { useContext, useState } from "react";
import { Col } from "reactstrap";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import  { LogInSchema } from "@/utils/hooks/auth/useLogin";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { ReactstrapInput } from "@/components/reactstrapFormik";
import { useRouter } from "next/navigation";

const Login = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter()
  return (
    <div className="box-wrapper">
      <LoginBoxWrapper>
        <div className="log-in-title">
          <h3>{t("WelcomeToFastkart")}</h3>
          <h4>{t("LogInYourAccount")}</h4>
        </div>
        <div className="input-box">
          <Formik
            initialValues={{
              email: "admin@example.com",
              password: "123456789",
            }}
            validationSchema={LogInSchema}
            onSubmit={() => {
              router.push(`/${i18Lang}/dashboard`)
            }}>
            {() => (
              <Form className="row g-2">
                <Col sm="12">
                  <Field name="email" type="email" component={ReactstrapInput} className="form-control" id="email" placeholder="Email Address" label="EmailAddress" />
                </Col>
                <Col sm="12">
                  <Field name="password" component={ReactstrapInput} type="password" className="form-control" id="password" placeholder="Password" label="Password" />
                </Col>
                <Col sm="12">
                  <div className="forgot-box">
                    <Link href={`/${i18Lang}/auth/forgot-password`} className="forgot-password">
                      {t("ForgotPassword")}?
                    </Link>
                  </div>
                </Col>
                <Col sm="12">
                  <Btn title="Login" className="btn btn-animation w-100 justify-content-center" type="submit" color="false"  />
                  <div className="sign-up-box">
                    <h4>{'Don\'t Have Seller Account?'}</h4>
                    <Link href={`/${i18Lang}/auth/register`}>{'Sign Up'}</Link>
                  </div>
                </Col>
              </Form>
            )}
          </Formik>
        </div>
      </LoginBoxWrapper>
    </div>
  );
};

export default Login;
