import { useTranslation } from "@/app/i18n/client";
import StepWrapper from "./StepWrapper";
import SimpleInputField from "../../inputFields/SimpleInputField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const StepTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][steps][status]" title="status" />
            <SimpleInputField nameList={[{ name: '[options][seller][steps][title]', title: 'Title', placeholder: t('EnterTitle') }]} />
            <StepWrapper stepDetails={{ value: "step_1", title: "Step1" }} />
            <StepWrapper stepDetails={{ value: "step_2", title: "Step2" }} />
            <StepWrapper stepDetails={{ value: "step_3", title: "Step3" }} />
        </>
    )
}

export default StepTab