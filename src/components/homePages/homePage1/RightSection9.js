import React, { useContext } from 'react'
import SimpleInputField from '../../inputFields/SimpleInputField'
import { RiArrowDownLine } from 'react-icons/ri'
import CheckBoxField from '../../inputFields/CheckBoxField'
import { useQuery } from '@tanstack/react-query'
import { blog } from '../../../utils/axiosUtils/API'
import Loader from '../../commonComponent/Loader'
import MultiSelectField from '../../inputFields/MultiSelectField'
import request from '../../../utils/axiosUtils'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const RightSection9 = ({ values, setFieldValue, active, setActive }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data, isLoading } = useQuery({queryKey: [blog], queryFn: () => request({ url: blog }),
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem?.id, name: elem.title } })
    });
    if (isLoading) return <Loader />
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(9)}>{values['content']?.['main_content']['section9_featured_blogs']['title']}<RiArrowDownLine />
            </div>
            {active == 9 && (
                <div className="rule-edit-form">
                    <SimpleInputField nameList={[
                        { name: `[content][main_content][section9_featured_blogs][title]`, placeholder: t("EnterTitle"), title: "Title" },
                        { name: `[content][main_content][section9_featured_blogs][sub_title]`, placeholder: t("EnterSubTitle"), title: "SubTitle" }
                    ]} />
                    <MultiSelectField values={values} setFieldValue={setFieldValue} name='mainRightContentBlog' title="Blogs" data={data} />
                    <CheckBoxField name="[content][main_content][section9_featured_blogs][status]" title="Status" />
                </div>
            )}
        </div>
    )
}

export default RightSection9