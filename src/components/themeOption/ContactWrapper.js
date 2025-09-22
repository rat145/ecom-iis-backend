import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from '../inputFields/SimpleInputField';
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const ContactWrapper = ({ contactDetails }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div>
            <h4 className="fw-semibold mb-3 txt-primary w-100">{t(contactDetails?.title)}</h4>
            <SimpleInputField
                nameList={[
                    { name: `[options][contact_us][${contactDetails.value}][label]`, title: 'Label', placeholder: t('EnterLabel') },
                    { name: `[options][contact_us][${contactDetails.value}][icon]`, title: 'Icon', placeholder: t('EnterIcon') },
                    { name: `[options][contact_us][${contactDetails.value}][text]`, title: 'Text', placeholder: t('EnterText') },
                ]}
            />
        </div>
    )
}

export default ContactWrapper