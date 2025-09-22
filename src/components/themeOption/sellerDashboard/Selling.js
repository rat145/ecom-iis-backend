import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from "../../inputFields/SimpleInputField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const Selling = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][start_selling][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: `[options][seller][start_selling][title]`, title: 'Title', placeholder: t('EnterTitle') },
                    { name: `[options][seller][start_selling][description]`, type: "textarea", rows: 6, title: 'description', placeholder: t('EnterDescription') },
                ]}
            />
        </>
    )
}

export default Selling