import React, { useContext } from "react";
import MultiSelectField from "../../inputFields/MultiSelectField";
import SimpleInputField from "../../inputFields/SimpleInputField";
import { useQuery } from "@tanstack/react-query";
import request from "../../../utils/axiosUtils";
import Loader from "../../commonComponent/Loader";
import I18NextContext from "@/helper/i18NextContext";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { blog } from "../../../utils/axiosUtils/API";
import { useTranslation } from "@/app/i18n/client";

const FeatureBlogTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data, isLoading } = useQuery({queryKey: [blog], queryFn: () => request({ url: blog }),
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.title } })
    });
    if (isLoading) return <Loader />
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][featured_blogs][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][featured_blogs][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
            ]} />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name='featureBlogSelect' title="Blogs" data={data} />
            <CheckBoxField name={`[content][featured_blogs][status]`} title="Status" />
        </>
    )
}
export default FeatureBlogTab