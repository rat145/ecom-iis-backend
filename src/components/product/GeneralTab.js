import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../utils/axiosUtils";
import { store } from "../../utils/axiosUtils/API";
import SimpleInputField from "../inputFields/SimpleInputField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import DescriptionInput from "./DescriptionInput";
import SettingContext from "../../helper/settingContext";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/helper/i18NextContext";

const GeneralTab = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext)
  const { data: StoreData } = useQuery({queryKey: [store], queryFn: () => request({ url: store, params: { status: 1 } }), refetchOnWindowFocus: false, select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.store_name })) });
  return (
    <>
      <SimpleInputField nameList={[{ name: "name", require: "true", placeholder: t("EnterName") }, { name: "short_description", require: "true", title: "ShortDescription", type: "textarea", rows: 3, placeholder: t("EnterShortDescription"), helpertext: "*Maximum length should be 300 characters." }]} />
      <DescriptionInput values={values} setFieldValue={setFieldValue} title={t('Description')} nameKey="description" errorMessage={"Descriptionisrequired"} />
      {state?.isMultiVendor && <SearchableSelectInput
        nameList={[
          {
            name: "store_id",
            title: "Store",
            require: "true",
            inputprops: {
              name: "store_id",
              id: "store_id",
              options: StoreData || [],
              close: true
            },
          },
        ]}
      />}
    </>
  );
};

export default GeneralTab;
