'use client'
import { RegistrationInitialValues, RegistrationValidationSchema } from "@/components/auth/RegistrationFormObjects";
import UserAddress from "@/components/auth/UserAddress";
import UserContact from "@/components/auth/UserContact";
import UserPersonalInfo from "@/components/auth/UserPersonalInfo";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import { YupObject } from "@/utils/validation/ValidationSchemas";
import { useTranslation } from "@/app/i18n/client";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Col, Container, Row } from "reactstrap";

const VendorRegister = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const router = useRouter()

    return (
        <section className='log-in-section section-b-space'>
            <Container className='w-100'>
                <Row>
                    <Col xl={7}>
                        <div className="log-in-box">
                            <div className="log-in-title">
                                <h3>{"Welcome To Fastkart"}</h3>
                                <h4>{"Setup Your Store Information"}</h4>
                            </div>
                            <div className="input-box">
                                <Formik
                                    initialValues={RegistrationInitialValues}
                                    validationSchema={YupObject({
                                        ...RegistrationValidationSchema,
                                    })}
                                    onSubmit={(values) => {
                                        values["status"] = 1;
                                        router.push(`/${i18Lang}/auth/login`)
                                      }}
                                >
                                    {({ values, errors }) => (
                                        <Form className="row g-4">
                                            <UserPersonalInfo />
                                            <UserAddress values={values} />
                                            <UserContact />
                                            <Col xs={12}>
                                                <Btn title="Submit" className="btn btn-animation w-100 justify-content-center" type="submit" color="false"  />
                                                <div className="sign-up-box">
                                                    <h4>{t("Alreadyhaveanaccount?")}</h4>
                                                    <Link href={`/${i18Lang}/auth/login`}>{t("Login")}</Link>
                                                </div>
                                            </Col>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default VendorRegister;
