import SimpleInputField from "../../inputFields/SimpleInputField"
import FileUploadField from "../../inputFields/FileUploadField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { getHelperText } from "../../../utils/customFunctions/getHelperText";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";


const AboutSeller = ({ values, setFieldValue, errors }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][about][status]" title="status" />
            <SimpleInputField
                nameList={[
                    { name: '[options][seller][about][title]', title: 'Title', placeholder: t('EnterTitle') },
                    { name: '[options][seller][about][description]', title: 'description', type: "textarea", placeholder: t('EnterDescription'), rows: 8 },
                ]}
            />
            <FileUploadField name="aboutSellerImage" title='Image' id="aboutSellerImage" showImage={values['aboutSellerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('512x438px')} />
        </>
    )
}

export default AboutSeller