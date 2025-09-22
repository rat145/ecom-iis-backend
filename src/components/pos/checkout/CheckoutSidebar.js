import React, { useContext, useEffect, useState } from 'react'
import { Card, Col } from 'reactstrap'
import SidebarCheckoutCard from './SidebarCheckoutCard'
import SettingContext from '../../../helper/settingContext'
import PlaceOrder from './PlaceOrder'
import ApplyCoupon from '../ApplyCoupon'
import PointWallet from '../PointWallet'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const CheckoutSidebar = ({ values, setFieldValue, userData }) => {
    const [storeCoupon, setStoreCoupon] = useState()
    const [checkoutData, setCheckoutData] = useState({})
    const { convertCurrency } = useContext(SettingContext)
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');

    // Checking point and wallet for particular user
    useEffect(() => {
        userData?.filter((elem) => {
            if (elem.id == values['consumer_id']) {
                if (elem?.point) {
                    setFieldValue('isPoint', elem?.point)
                } else {
                    setFieldValue('isPoint', '')
                }
                if (elem?.wallet) {
                    setFieldValue('isWallet', elem?.wallet)
                } else {
                    setFieldValue('isWallet', '')
                }
            }
        })
    }, [values['consumer_id']])

    // Submitting data on Checkout
    useEffect(() => {
        if (values['billing_address_id'] && values['shipping_address_id'] && values['delivery_description'] && values['payment_method']) {
            values["variation_id"] = ""
            delete values['total'];
            setStoreCoupon('')
            setCheckoutData({
                total: {
                    convert_point_amount: -10, convert_wallet_balance: -84.4, coupon_total_discount: 10, points: 300, points_amount: 10, shipping_total: 0, sub_total: 35.19, tax_total: 2.54, total: 37.73, wallet_balance: 84.4,
                }
            })
        }
    }, [values['billing_address_id'], values['shipping_address_id'], values['payment_method'], values['delivery_description'], values['points_amount'], values['wallet_balance']])
    return (
        <Col xxl="4">
            <Card className="pos-detail-card">
                <SidebarCheckoutCard values={values} setFieldValue={setFieldValue} />
                <div className="pos-loader">
                    <ul className={`summary-total`}>
                        <li>
                            <h4>{t("Subtotal")}</h4>
                            <h4 className="price">{checkoutData?.total?.sub_total ? convertCurrency(checkoutData?.total?.sub_total) : t(`Notcalculatedyet`)}</h4>
                        </li>
                        <li>
                            <h4>{t("Shipping")}</h4>
                            <h4 className="price">{(checkoutData?.total?.shipping_total >= 0) ? convertCurrency(checkoutData?.total?.shipping_total) : t(`Notcalculatedyet`)}</h4>
                        </li>
                        <li>
                            <h4>{t("Tax")}</h4>
                            <h4 className="price">{checkoutData?.total?.tax_total ? convertCurrency(checkoutData?.total?.tax_total) : t(`Notcalculatedyet`)}</h4>
                        </li>

                        <PointWallet values={values} setFieldValue={setFieldValue} checkoutData={checkoutData} />
                        {values['consumer_id'] && values['billing_address_id'] && values['shipping_address_id'] && values['payment_method'] && values['delivery_description'] && <ApplyCoupon values={values} setFieldValue={setFieldValue} checkoutData={checkoutData} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} />}

                        <li className='list-total'>
                            <h4>{t("Total")}</h4>
                            <h4 className="price">{checkoutData?.total?.total ? convertCurrency(checkoutData?.total?.total) : t(`Notcalculatedyet`)}</h4>
                        </li>
                    </ul>
                </div>
                <PlaceOrder values={values} />
            </Card>
        </Col >
    )
}

export default CheckoutSidebar