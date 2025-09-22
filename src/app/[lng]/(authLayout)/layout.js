"use client";
import React, { useContext, useEffect } from "react";
import { use } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { Col, Container, Row } from "reactstrap";

const AuthLayout = ({ children, params }) => {
  const { i18Lang, setI18Lang } = useContext(I18NextContext);
  const { lng } = use(params); // Unwrap the promise using React.use()

  useEffect(() => {
    if (i18Lang === "") {
      setI18Lang(lng);
    }
  }, [lng]);

  return (
    <section className="log-in-section section-b-space">
      <Container className="w-100">
        <Row>
          <Col xl="5" lg="6" className="me-auto">
            {children}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AuthLayout;
