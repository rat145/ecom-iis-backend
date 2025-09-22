import React, { useContext, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from "@/app/i18n/client";
import { Card, Col, Row } from 'reactstrap';
import I18NextContext from "@/helper/i18NextContext";
import TabTitle from '../../coupon/TabTitle';
import { Form, Formik } from 'formik';
import Loader from '../../commonComponent/Loader';
import { HomePageAPI } from '../../../utils/axiosUtils/API';
import request from '../../../utils/axiosUtils';
import { HomePage2SettingTab } from '../../../data/TabTitleListData';
import FormBtn from '../../../elements/buttons/FormBtn';
import HomePage2InitialValue from './HomePage2InitialValue';
import HomePage2Submit from './HomePage2Submit';
import AllTabsHomePage2 from './AllTabsHomePage2';

const HomePageTwoForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const { data, isLoading } = useQuery({queryKey: [HomePageAPI], queryFn: () => request({ url: `${HomePageAPI}/tokyo` }),
        refetchOnWindowFocus: false, select: (res) => { return res.data }
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
                ...HomePage2InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage2Submit(values)
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
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage2SettingTab} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage2 values={values} setFieldValue={setFieldValue} activeTab={activeTab} ref={refRefetch} />
                                <FormBtn />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}

export default HomePageTwoForm