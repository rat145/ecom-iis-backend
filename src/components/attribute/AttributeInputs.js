import SimpleInputField from '../inputFields/SimpleInputField'
import SearchableSelectInput from '../inputFields/SearchableSelectInput'
import { variantStyle } from '../../data/TabTitleListData'
import I18NextContext from '@/helper/i18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';


const AttributeInputs = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: "name", placeholder: t("EnterAttributeName"), require: "true" }]} />
            <SearchableSelectInput
                nameList={[
                    {
                        name: "style",
                        title: "Style",
                        require: "true",
                        inputprops: {
                            name: "style",
                            id: "style",
                            options: variantStyle,
                            helpertext: "*Choose the desired shape style, such as rectangle or circle. Based on your selection, variant options will be displayed on product page."
                        },
                    },
                ]}
            />
        </>
    )
}

export default AttributeInputs