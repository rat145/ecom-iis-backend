import { useContext } from 'react';
import Btn from '../../../elements/buttons/Btn'
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from '@/helper/i18NextContext';
import { useRouter } from 'next/navigation';

const PlaceOrder = ({ values }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const router = useRouter()
    const handleClick = () => {
        // Put Your Logic Here
        router.push(`/${i18Lang}/order/details/1000`)
    }
    return (
        <Btn className="btn btn-theme payment-btn mt-4" onClick={handleClick} disabled={values['consumer_id'] && values['billing_address_id'] && values['shipping_address_id'] && values['payment_method'] && values['delivery_description'] ? false : true}>
            {t("PlaceOrder")}
        </Btn>
    )
}

export default PlaceOrder