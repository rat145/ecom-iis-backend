import React, { useContext, useEffect } from 'react'
import { Form, Formik } from 'formik';
import { Row } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import { AllCurrencyData } from '../../data/AllCurrencyData';
import FormBtn from '../../elements/buttons/FormBtn';
import request from '../../utils/axiosUtils';
import { currency } from '../../utils/axiosUtils/API';
import { nameSchema, YupObject } from '../../utils/validation/ValidationSchemas';
import I18NextContext from "@/helper/i18NextContext";
import Loader from '../commonComponent/Loader';
import CheckBoxField from '../inputFields/CheckBoxField';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import SimpleInputField from '../inputFields/SimpleInputField';
import CurrencySymbol from './CurrencySymbol';
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from 'next/navigation';

const CurrencyForm = ({ updateId, }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery({queryKey: ["/currency/id"], queryFn: () => request({ url: `${currency}/${updateId}` }),
        enabled: false, select: (data) => data?.data
    });
    const router = useRouter()
    useEffect(() => {
        updateId && refetch();
    }, [updateId]);
    if (updateId && oldDataLoading) return <Loader />;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                code: updateId ? oldData?.code || "" : "",
                symbol: updateId ? oldData?.symbol || "" : "",
                no_of_decimal: updateId ? oldData?.no_of_decimal || "" : "",
                exchange_rate: updateId ? Number(oldData?.exchange_rate) || "" : "",
                symbol_position: updateId ? oldData?.symbol_position || "" : "",
                status: updateId ? Boolean(Number(oldData?.status)) : true,
            }}
            validationSchema={YupObject({
                code: nameSchema,
                symbol: nameSchema,
                exchange_rate: nameSchema,
                symbol_position: nameSchema
            })}
            onSubmit={() => {
                // Put Add Or Update Logic Here
                router.push(`/${i18Lang}/currency`)
            }}>
            {({ values, setFieldValue }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <Row>
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "code", title: "CurrencyCode", require: "true",
                                    inputprops: {
                                        name: "code",
                                        id: "code",
                                        options: AllCurrencyData.map((elem) => { return { id: elem.currency_code, name: elem.currency_code } }),
                                        defaultOption: "Select Code",
                                    },
                                }
                            ]}
                        />
                        <CurrencySymbol values={values} setFieldValue={setFieldValue} />
                        <SimpleInputField nameList={[{ title: "DecimalNumber", name: "no_of_decimal", type: "number", placeholder: t("EnterDecimalNumber") }, {
                            name: "exchange_rate", title: "ExchangeRate", require: "true", type: "number", placeholder: t("EnterExchangeRate"), helpertext: "*Specify the exchange rate for converting other currencies to US Dollars (USD)."
                        }]} />
                        <SearchableSelectInput
                            nameList={
                                [
                                    {
                                        name: "symbol_position",
                                        title: "SymbolPosition",
                                        require: "true",
                                        inputprops: {
                                            name: "symbol_position",
                                            id: "symbol_position",
                                            options: [
                                                { id: "after_price", name: "AfterPrice" },
                                                { id: "before_price", name: "BeforePrice" },
                                            ],
                                            defaultOption: "Select Type",
                                        },
                                    },
                                ]
                            }
                        />
                        <CheckBoxField name="status" />

                        <FormBtn />
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default CurrencyForm