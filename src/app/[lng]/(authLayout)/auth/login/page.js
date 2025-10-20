"use client";

import React, { useContext, useState } from "react";
import { Col } from "reactstrap";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import { LogInSchema } from "@/utils/hooks/auth/useLogin";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { ReactstrapInput } from "@/components/reactstrapFormik";
import { loginUser } from "@/services/authService";

const Login = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      // Login with Firebase
      const result = await loginUser(values.email, values.password);

      if (result.success) {
        // Check if user has admin or vendor role
        if (result.user.role === "admin" || result.user.role === "vendor") {
          toast.success("Login successful!");
          router.push(`/${i18Lang}/dashboard`);
        } else {
          // Not authorized for admin panel
          toast.error(
            "Access denied. This panel is for admins and vendors only."
          );
          // Logout the user
          await import("@/services/authService").then((module) =>
            module.logoutUser()
          );
        }
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific Firebase errors
      let errorMessage = "Login failed. Please try again.";

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed login attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
              email: "",
              password: "",
            }}
            validationSchema={LogInSchema}
            onSubmit={handleLogin}
          >
            {() => (
              <Form className="row g-2">
                <Col sm="12">
                  <Field
                    name="email"
                    type="email"
                    component={ReactstrapInput}
                    className="form-control"
                    id="email"
                    placeholder="Email Address"
                    label="EmailAddress"
                  />
                </Col>
                <Col sm="12">
                  <Field
                    name="password"
                    component={ReactstrapInput}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    label="Password"
                  />
                </Col>
                <Col sm="12">
                  <div className="forgot-box">
                    <Link
                      href={`/${i18Lang}/auth/forgot-password`}
                      className="forgot-password"
                    >
                      {t("ForgotPassword")}?
                    </Link>
                  </div>
                </Col>
                <Col sm="12">
                  <Btn
                    title={loading ? "Logging in..." : "Login"}
                    className="btn btn-animation w-100 justify-content-center"
                    type="submit"
                    color="false"
                    disabled={loading}
                  />
                  <div className="sign-up-box">
                    <h4>{"Don't Have Account?"}</h4>
                    <Link href={`/${i18Lang}/auth/register`}>{"Sign Up"}</Link>
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
