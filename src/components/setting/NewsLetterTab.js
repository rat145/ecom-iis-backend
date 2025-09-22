import { useTranslation } from "@/app/i18n/client";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const NewsLetterTab = () => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <div>
      <SimpleInputField
        nameList={[
          { name: "[values][newsletter][mailchip_api_key]", title: "MailchipApiKey", placeholder: t("EnterMailChipApiKey") },
          { name: "[values][newsletter][mailchip_list_id]", title: "MailchipListId", placeholder: t("EnterMailChipListId") },
        ]}
      />
      <CheckBoxField name="[values][newsletter][status]" title="MailchipStatus" />
    </div>
  );
};

export default NewsLetterTab;
