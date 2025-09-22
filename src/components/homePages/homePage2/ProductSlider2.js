import React, { useContext } from 'react'
import SimpleInputField from '../../inputFields/SimpleInputField'
import CheckBoxField from '../../inputFields/CheckBoxField'
import MultiSelectField from '../../inputFields/MultiSelectField'
import { useQuery } from '@tanstack/react-query'
import { product } from '../../../utils/axiosUtils/API'
import request from '../../../utils/axiosUtils'
import Loader from '../../commonComponent/Loader'
import { placeHolderImage } from '../../../data/CommonPath'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const ProductSlider2 = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data, isLoading } = useQuery({queryKey: [product], queryFn: () => request({ url: product, params: { status: 1 } }),
        select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage } })
    });
    if (isLoading) return <Loader />
    return (
        <>
            <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("ProductSlider")} 2</h4>
            <SimpleInputField nameList={[
                { name: `[content][main_content][section2_slider_products][product_slider_2][title]`, placeholder: t("EnterTitle"), title: "Title" },
            ]} />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name='mainContentProduct2ProductIds' title="Products" data={data} />
            <CheckBoxField name={`[content][main_content][section2_slider_products][product_slider_2][status]`} title="Status" />
        </>
    )
}

export default ProductSlider2