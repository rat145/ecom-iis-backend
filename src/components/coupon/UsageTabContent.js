import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "@/app/i18n/client";

const UsageTabContent = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <CheckBoxField name="is_unlimited" />
      {!values["is_unlimited"] && <SimpleInputField nameList={[{
        name: "usage_per_coupon", placeholder: t("EnterValue"), helpertext: "*Specify the maximum number of times a single coupon can be utilized."
      }, { name: "usage_per_customer", placeholder: t("EnterValue"), helpertext: "*Specify the maximum number of times a single customer can utilize the coupon." }]} />}
    </>
  );
};

export default UsageTabContent;
