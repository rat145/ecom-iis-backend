import SimpleInputField from '../../inputFields/SimpleInputField';
import I18NextContext from "@/helper/i18NextContext";
import Loader from '../../commonComponent/Loader';
import { useQuery } from '@tanstack/react-query';
import { blog } from '../../../utils/axiosUtils/API';
import request from '../../../utils/axiosUtils';
import MultiSelectField from '../../inputFields/MultiSelectField';
import CheckBoxField from '../../inputFields/CheckBoxField';
import { useTranslation } from "@/app/i18n/client";
import { useContext } from 'react';

const FeatureBlog4 = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data, isLoading } = useQuery({queryKey: [blog], queryFn: () => request({ url: blog }),
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.title } })
    });
    if (isLoading) return <Loader />
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][featured_blogs][title]`, placeholder: t("EnterTitle"), title: "Title" }]} />
            <MultiSelectField name='featureBlogSelect' title="Blogs" data={data} values={values} setFieldValue={setFieldValue} />
            <CheckBoxField name={`[content][featured_blogs][status]`} title="Status" />
        </>
    )
}

export default FeatureBlog4