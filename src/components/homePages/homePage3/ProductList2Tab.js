import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/helper/i18NextContext";
import SimpleInputField from "../../inputFields/SimpleInputField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";
import { useContext } from "react";

const ProductList2Tab = ({ values, setFieldValue, productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][products_list_2][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][products_list_2][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
            ]} />
            <SearchableSelectInput
                nameList={
                    [{
                        name: 'productList2Product',
                        title: "Products",
                        inputprops: {
                            name: 'productList2Product',
                            id: 'productList2Product',
                            options: productData || [],
                            setsearch: setSearch,
                        }
                    },
                    ]}
            />
            <CheckBoxField name={`[content][products_list_2][status]`} title="Status" />
        </>
    )
}
export default ProductList2Tab