import { useContext, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Card, Col, Row } from "reactstrap";
import I18NextContext from "@/helper/i18NextContext";
import TabTitle from "../../coupon/TabTitle";
import Loader from "../../commonComponent/Loader";
import FormBtn from "../../../elements/buttons/FormBtn";
import { HomePageAPI } from "../../../utils/axiosUtils/API";
import request from "../../../utils/axiosUtils";
import { HomePage3SetttingTitle } from "../../../data/TabTitleListData";
import HomePage3Submit from "./HomePage3Submit";
import HomePage3InitialValue from "./HomePage3InitialValue";
import AllTabsHomePage3 from './AllTabsHomePage3'

const HomePageThreeForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const { data, isLoading } = useQuery({queryKey: [HomePageAPI], queryFn: () => request({ url: `${HomePageAPI}/osaka` }),
        refetchOnWindowFocus: false, select: (res) => res.data
    });
    let IncludeList = ['status']
    let NewSettingsData = data || {};
    const RecursiveSet = ({ data }) => {
        if (data && typeof data == 'object') {
            Object.keys(data).forEach(key => {
                if (data[key] == 0 && IncludeList.includes(key)) {
                    data[key] = false
                } else if (data[key] == 1 && IncludeList.includes(key)) {
                    data[key] = true
                } else {
                    RecursiveSet({ data: data[key] });
                }
            })
        }
    }
    RecursiveSet({ data: NewSettingsData })
    if (isLoading) return <Loader />
    return (
        <Formik
            enableReinitialize
            initialValues={{ ...HomePage3InitialValue(NewSettingsData) }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage3Submit(values)
            }}>
            {({ values, errors, touched, setFieldValue }) => (
                <Col>
                    <Card>
                        <div className="title-header option-title">
                            <h5>{t(title)}</h5>
                        </div>
                        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
                            <Row>
                                <Col xl="3" lg="4">
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage3SetttingTitle} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage3 activeTab={activeTab} values={values} setFieldValue={setFieldValue} ref={refRefetch} />
                                <FormBtn />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}
export default HomePageThreeForm