import SimpleInputField from '../../inputFields/SimpleInputField'
import CheckBoxField from '../../inputFields/CheckBoxField'
import MultiSelectField from '../../inputFields/MultiSelectField'
import { useContext } from 'react'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const CategoryProductTab = ({ values, setFieldValue, categoryData }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: "[content][categories_products][title]", placeholder: t("EnterTitle"), title: "Title" }]} />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name='categoryProduct' title="Categories" data={categoryData} />
            <CheckBoxField name="[content][categories_products][status]" title="Status" />
        </>
    )
}

export default CategoryProductTab