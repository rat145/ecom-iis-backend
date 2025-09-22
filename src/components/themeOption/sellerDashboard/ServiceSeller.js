import { useTranslation } from "@/app/i18n/client";
import SimpleInputField from "../../inputFields/SimpleInputField"
import ServiceWrapper from "./ServiceWrapper";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const ServiceSeller = ({ values, errors, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][services][status]" title="status" />
            <SimpleInputField nameList={[{ name: '[options][seller][services][title]', title: 'Title', placeholder: t('EnterTitle') }]} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_1", title: "ServiceBox1", imageName: "serviceImage1" }} setFieldValue={setFieldValue} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_2", title: "ServiceBox2", imageName: "serviceImage2" }} setFieldValue={setFieldValue} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_3", title: "ServiceBox3", imageName: "serviceImage3" }} setFieldValue={setFieldValue} />
            <ServiceWrapper values={values} errors={errors} serviceName={{ value: "service_4", title: "ServiceBox4", imageName: "serviceImage4" }} setFieldValue={setFieldValue} />
        </>
    )
}

export default ServiceSeller