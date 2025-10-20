"use client";

import React, { useContext, useState } from "react";
import { Col } from "reactstrap";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { ReactstrapInput } from "@/components/reactstrapFormik";
import { registerUser } from "@/services/authService";
import {
  YupObject,
  emailSchema,
  nameSchema,
  passwordConfirmationSchema,
  passwordSchema,
  phoneSchema,
} from "@/utils/validation/ValidationSchemas";

const RegisterSchema = YupObject({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  password_confirmation: passwordConfirmationSchema,
  phone: phoneSchema,
});

const Register = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);

    try {
      // Register user with Firebase
      // Note: By default, users are created as 'customer'
      // Admin needs to manually change role to 'vendor' or 'admin' in Firestore
      const result = await registerUser(
        values.email,
        values.password,
        values.name,
        values.phone || ""
      );

      if (result.success) {
        toast.success(
          "Registration successful! Your account has been created as a customer. Please contact the administrator to upgrade to vendor/admin access."
        );

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push(`/${i18Lang}/auth/login`);
        }, 3000);
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific Firebase errors
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please login instead.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
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
          <h3>{"Create Account"}</h3>
          <h4>{"Register for Vendor/Admin Access"}</h4>
        </div>
        <div className="input-box">
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {() => (
              <Form className="row g-2">
                <Col sm="12">
                  <Field
                    name="name"
                    type="text"
                    component={ReactstrapInput}
                    className="form-control"
                    id="name"
                    placeholder="Full Name"
                    label="FullName"
                  />
                </Col>
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
                    name="phone"
                    type="tel"
                    component={ReactstrapInput}
                    className="form-control"
                    id="phone"
                    placeholder="Phone Number (Optional)"
                    label="Phone"
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
                  <Field
                    name="password_confirmation"
                    component={ReactstrapInput}
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    placeholder="Confirm Password"
                    label="ConfirmPassword"
                  />
                </Col>
                <Col sm="12">
                  <div
                    className="note-box"
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff3cd",
                      borderRadius: "4px",
                      marginBottom: "10px",
                      fontSize: "12px",
                      color: "#856404",
                    }}
                  >
                    <strong>Note:</strong> New accounts are created with
                    customer role. Please contact the administrator to upgrade
                    to vendor or admin access.
                  </div>
                </Col>
                <Col sm="12">
                  <Btn
                    title={loading ? "Creating Account..." : "Sign Up"}
                    className="btn btn-animation w-100 justify-content-center"
                    type="submit"
                    color="false"
                    disabled={loading}
                  />
                  <div className="sign-up-box">
                    <h4>{"Already Have Account?"}</h4>
                    <Link href={`/${i18Lang}/auth/login`}>{"Login"}</Link>
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

export default Register;
