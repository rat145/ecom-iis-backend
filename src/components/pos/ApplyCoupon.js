import React, { useContext, useState } from 'react'
import { Input } from 'reactstrap'
import Btn from '../../elements/buttons/Btn'
import Image from 'next/image'
import SettingContext from '../../helper/settingContext'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const ApplyCoupon = ({ checkoutData, setFieldValue, storeCoupon, setStoreCoupon }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [errorCoupon, setErrorCoupon] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState(false)
    const { convertCurrency } = useContext(SettingContext)
    const onCouponApply = (value) => {
        setStoreCoupon(value)
    }
    const removeCoupon = () => {
        setAppliedCoupon(null)
        setFieldValue('coupon', '')
        setStoreCoupon('')
        // Put Add Or Update Logic Here
    }
    return (
        <>
            {appliedCoupon == 'applied' ?
                <li className='coupon-sec'>
                    <div className='apply-sec mb-3'>
                        <div>
                            <Image src={'/assets/images/offer.gif'} className='img-fluid' height={20} width={20} />
                            <h4>{t("Yousaved")} <span>{convertCurrency(checkoutData?.total?.coupon_total_discount)}</span> {("withthiscode")} 🎉 <p>{t("CouponApplied")}</p></h4>
                        </div>
                    </div>
                    <a href='#javascript' onClick={() => removeCoupon()}>{t("Remove")}</a>
                </li>
                :
                <li>
                    <div className='coupon-box mt-2 mb-3 d-flex w-100'>
                        <div className='input-group'>
                            <Input type='text' className='form-control' placeholder={t("EnterCoupon")} onChange={(e) => onCouponApply(e.target.value)} />
                            <Btn className="btn-apply" onClick={() => {
                                setErrorCoupon("")
                                storeCoupon !== '' && setAppliedCoupon("applied")
                            }}>{t("Apply")}</Btn>
                        </div>
                    </div>
                    <div className='invalid-feedback d-block'>{errorCoupon}</div>
                </li>
            }
        </>
    )
}

export default ApplyCoupon