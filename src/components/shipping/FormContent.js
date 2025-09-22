import React, { useContext } from 'react'
import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from "../inputFields/SimpleInputField";
import SearchableSelectInput from '../inputFields/SearchableSelectInput'
import I18NextContext from '@/helper/i18NextContext';

const FormContent = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: "name", title: 'Name', placeholder: t("EnterName") }]} />
            <SimpleInputField
                nameList={[
                    { name: "min", type: "number", placeholder: t("EnterMinValue"), require: "true" },
                    { name: "max", type: "number", placeholder: t("EnterMaxValue"), require: "true" },
                ]}
            />
            <SearchableSelectInput
                nameList={[
                    {
                        name: "rule_type",
                        title: "RuleType",
                        require: "true",
                        inputprops: {
                            name: "rule_type",
                            id: "rule_type",
                            options: [
                                { id: "base_on_price", name: "Base On Price" },
                                { id: "base_on_weight", name: "Base On Weight" },
                            ],
                        },
                    },
                    {
                        name: "shipping_type",
                        title: "ShippingType",
                        require: "true",
                        inputprops: {
                            name: "shipping_type",
                            id: "shipping_type",
                            options: [
                                { id: "free", name: "Free" },
                                { id: "fixed", name: "Fixed" },
                                { id: "percentage", name: "Percentage" },
                            ],
                        },
                    },
                ]}
            />
        </>
    )
}

export default FormContent