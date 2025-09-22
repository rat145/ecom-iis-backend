import React, { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";
import FileUploadField from "../inputFields/FileUploadField";
import SimpleInputField from "../inputFields/SimpleInputField";
import I18NextContext from "@/helper/i18NextContext";

const SeoTab = ({ setFieldValue, values, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <SimpleInputField nameList={[{ name: "meta_title", placeholder: t("EnterMetaTitle") }, { name: "meta_description", placeholder: t("EnterMetaDescription"),type:"textarea" }]} />
      <FileUploadField name="product_meta_image_id" title="ProductMetaImage" id="product_meta_image_id" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} />
    </>
  );
};

export default SeoTab;
