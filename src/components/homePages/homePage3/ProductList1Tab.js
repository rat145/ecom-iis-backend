import SimpleInputField from "../../inputFields/SimpleInputField";
import I18NextContext from "@/helper/i18NextContext";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { useTranslation } from "@/app/i18n/client";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";
import { useContext } from "react";

const ProductList1Tab = ({ values, setFieldValue, productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][products_list_1][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][products_list_1][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
            ]} />
            <SearchableSelectInput
                nameList={
                    [{
                        name: 'productList1Product',
                        title: "Products",
                        inputprops: {
                            name: 'productList1Product',
                            id: 'productList1Product',
                            options: productData || [],
                            setsearch: setSearch,
                        }
                    },
                    ]}
            />
            <CheckBoxField name={`[content][products_list_1][status]`} title="Status" />
        </>
    )
}
export default ProductList1Tab