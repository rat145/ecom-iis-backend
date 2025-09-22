import React, { useContext } from 'react'
import SimpleInputField from '../inputFields/SimpleInputField'
import SearchableSelectInput from '../inputFields/SearchableSelectInput'
import { AllCountryCode } from '../../data/AllCountryCode'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const UserDetail1 = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: "name", placeholder: t("EnterUserName"), require: 'true' },
                { type: "email", name: "email", placeholder: t("EnterEmailAddress"), require: 'true' }
            ]} />
            <div className='country-input mb-4'>
                <SimpleInputField nameList={[{ name: "phone", type: "number", placeholder: t("EnterPhoneNumber"), require: 'true' }]} />
                <SearchableSelectInput
                    nameList={[
                        {
                            name: "country_code",
                            notitle: "true",
                            inputprops: {
                                name: "country_code",
                                id: "country_code",
                                options: AllCountryCode,
                            },
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default UserDetail1