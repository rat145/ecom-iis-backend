import SimpleInputField from '../inputFields/SimpleInputField'
import { useTranslation } from "@/app/i18n/client";
import CheckBoxField from '../inputFields/CheckBoxField';
import FileUploadField from '../inputFields/FileUploadField';
import { useContext } from 'react';
import I18NextContext from '@/helper/i18NextContext';

const MaintenanceTab = ({ values, setFieldValue, errors }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[values][maintenance][maintenance_mode]" title="MaintenanceMode" />
            {values?.values?.maintenance?.maintenance_mode &&
                <>
                    <SimpleInputField nameList={[
                        { name: "[values][maintenance][title]", title: "Title", placeholder: t("EnterTitle") },
                        { name: "[values][maintenance][description]", title: "Description", placeholder: t("EnterDescription") }]} />
                    <FileUploadField name="maintenance_image_id" uniquename={values?.values?.maintenance?.maintenance_image} title="LightLogo" errors={errors} id="maintenance_image_id" type="file" values={values} setFieldValue={setFieldValue} />
                </>}
        </>
    )
}

export default MaintenanceTab