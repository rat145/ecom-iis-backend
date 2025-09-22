import { useContext } from 'react';
import CheckBoxField from '../../inputFields/CheckBoxField'
import MultiSelectField from '../../inputFields/MultiSelectField';
import SimpleInputField from '../../inputFields/SimpleInputField'
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CategoriesImageList = ({ values, setFieldValue, categoryData }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][categories_image_list][title]`, placeholder: t("EnterTitle"), title: "Title" },
            ]} />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name='categoryIconList' title="Categories" data={categoryData} />
            <CheckBoxField name={`[content][categories_image_list][status]`} title="Status" />
        </>
    )
}

export default CategoriesImageList