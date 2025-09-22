import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from "@/app/i18n/client";
import { Card, Col, Row, TabContent } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import I18NextContext from "@/helper/i18NextContext";
import TabTitle from '../../coupon/TabTitle';
import Loader from '../../commonComponent/Loader';
import { HomePageAPI } from '../../../utils/axiosUtils/API';
import request from '../../../utils/axiosUtils';
import FormBtn from '../../../elements/buttons/FormBtn';
import { HomePage5SettingTitle } from '../../../data/TabTitleListData';
import HomePage5InitialValue from './HomePage5InitialValue';
import HomePage5Submit from './HomePage5Submit';
import AllHomePage5Tabs from './AllHomePage5Tabs';

const HomePageFiveForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()

    const { data, isLoading } = useQuery({queryKey: [HomePageAPI], queryFn: () => request({ url: `${HomePageAPI}/madrid` }),
        refetchOnWindowFocus: false, select: (res) => res.data
    });
    let NewSettingsData = data || {};
    let IncludeList = ['status']
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
            initialValues={{
                ...HomePage5InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage5Submit(values)
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
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage5SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <Col xl="7" lg="8">
                                    <TabContent activeTab={activeTab}>
                                        <AllHomePage5Tabs values={values} setFieldValue={setFieldValue} ref={refRefetch} />
                                    </TabContent>
                                </Col>
                                <FormBtn />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}

export default HomePageFiveForm