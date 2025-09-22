import { RiArrowDownLine } from 'react-icons/ri'
import CheckBoxField from '../../inputFields/CheckBoxField'
import SimpleInputField from '../../inputFields/SimpleInputField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import { useContext } from 'react'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const RightSection7 = ({ values, active, setActive, productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(7)}>{values['content']?.['main_content']['section7_products']['title']}<RiArrowDownLine />
            </div>
            {active == 7 && (
                <div className="rule-edit-form">
                    <SimpleInputField nameList={[
                        { name: `[content][main_content][section7_products][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][main_content][section7_products][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
                    ]} />
                    <SearchableSelectInput
                        nameList={
                            [{
                                name: 'mainRight7TabProductIds',
                                title: "Products",
                                inputprops: {
                                    name: 'mainRight7TabProductIds',
                                    id: 'mainRight7TabProductIds',
                                    options: productData || [],
                                    setsearch: setSearch,
                                }
                            },
                            ]}
                    />
                    <CheckBoxField name={`[content][main_content][section7_products][status]`} title="Status" />
                </div>
            )}
        </div>
    )
}

export default RightSection7