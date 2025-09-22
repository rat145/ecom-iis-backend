import { AllTimeZone } from "../../data/AllTimeZoneData";
import FileUploadField from "../inputFields/FileUploadField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "@/app/i18n/client";
import GeneralTab1 from "./GeneralTab1";
import { getHelperText } from "../../utils/customFunctions/getHelperText";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const GeneralTab = ({ values, setFieldValue, errors }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <FileUploadField name="light_logo_image_id" uniquename={values?.values?.general?.light_logo_image} title="LightLogo" errors={errors} id="light_logo_image_id" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('180x50px')} />

      <FileUploadField name="dark_logo_image_id" title="DarkLogo" uniquename={values?.values?.general?.dark_logo_image} id="dark_logo_image_id" type="file" values={values} setFieldValue={setFieldValue} errors={errors} helpertext={getHelperText('180x50px')} />

      <FileUploadField name="tiny_logo_image_id" title="TinyLogo" uniquename={values?.values?.general?.tiny_logo_image} id="tiny_logo_image_id" type="file" values={values} setFieldValue={setFieldValue} errors={errors} helpertext={getHelperText('50x30px')} />

      <FileUploadField name="favicon_image_id" title="Favicon" uniquename={values?.values?.general?.favicon_image} id="favicon_image_id" type="file" values={values} setFieldValue={setFieldValue} errors={errors} helpertext={getHelperText('16x16px')} />

      <SimpleInputField
        nameList={[
          { name: "[values][general][site_title]", title: "SiteTitle", placeholder: t("EnterSiteTitle"),require:"true",errormsg:"SiteTitle" },
          { name: "[values][general][site_tagline]", title: "siteTagline", placeholder: t("EnterSiteTagline") },]} 
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "default_timezone",
            title: "Timezone",
            inputprops: {
              name: "default_timezone",
              id: "default_timezone",
              options: AllTimeZone || [],
            },
          },
        ]}
      />
      <GeneralTab1 />
    </>
  );
};

export default GeneralTab;
