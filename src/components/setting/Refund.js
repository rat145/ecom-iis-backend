import React, { useContext } from 'react'
import CheckBoxField from '../inputFields/CheckBoxField'
import SimpleInputField from '../inputFields/SimpleInputField'
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from '@/helper/i18NextContext';

const RefundTab = ({ values }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div>
            <CheckBoxField name="[values][refund][status]" title="Status" />
            <SimpleInputField
                nameList={[
                    { name: "[values][refund][refundable_days]", title: "RefundableDays", placeholder: t("EnterRefundableDays"), helpertext: "*Define the period within which users can initiate refund requests for delivered items If left blank, this functionality will be disabled." }
                ]}
            />
        </div>
    )
}

export default RefundTab