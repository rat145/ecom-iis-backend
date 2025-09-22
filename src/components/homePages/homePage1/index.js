import React, { useContext, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { Card, Col, Row } from 'reactstrap';
import { useTranslation } from "@/app/i18n/client";
import TabTitle from '../../coupon/TabTitle';
import FormBtn from '../../../elements/buttons/FormBtn';
import { HomePage1SettingTitle } from '../../../data/TabTitleListData';
import I18NextContext from "@/helper/i18NextContext";
import request from '../../../utils/axiosUtils';
import { HomePageAPI } from '../../../utils/axiosUtils/API';
import Loader from '../../commonComponent/Loader';
import HomePage1Submit from './HomePage1Submit';
import HomePage1InitialValue from './HomePage1InitialValue';
import { RecursiveSet } from '../../../utils/customFunctions/RecursiveSet';
import AllTabsHomePage1 from './AllTabsHomePage1';

const HomePageOneForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const { data, isLoading } = useQuery({queryKey: ['HomePageAPI'], queryFn: () => request({ url: `${HomePageAPI}/paris` }),
        refetchOnWindowFocus: false, select: (res) => {
            return res.data
        }
    });
    let NewSettingsData = data || {};
    let IncludeList = ['status']
    RecursiveSet({ data: NewSettingsData, IncludeList })

    if (isLoading) return <Loader />
    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...HomePage1InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage1Submit(values)
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
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage1SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage1 activeTab={activeTab} values={values} setFieldValue={setFieldValue} isLoading={isLoading} ref={refRefetch} />
                                <FormBtn />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}

export default HomePageOneForm