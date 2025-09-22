import React, { useContext } from 'react'
import SimpleInputField from '../inputFields/SimpleInputField'
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from '@/helper/i18NextContext';

const PaypalTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <SimpleInputField nameList={[
            { name: 'paypal_email', title: 'PaypalEmail', placeholder: t('EnterPaypalEmail') }
        ]} />
    )
}

export default PaypalTab