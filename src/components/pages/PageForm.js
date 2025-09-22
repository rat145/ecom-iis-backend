import React, { useContext, useEffect } from 'react'
import { Formik, Form } from 'formik';
import SimpleInputField from '../inputFields/SimpleInputField';
import CheckBoxField from '../inputFields/CheckBoxField';
import FormBtn from '../../elements/buttons/FormBtn';
import { YupObject, nameSchema } from '../../utils/validation/ValidationSchemas';
import { PagesAPI } from '../../utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '../../utils/axiosUtils';
import Loader from '../commonComponent/Loader';
import { useTranslation } from "@/app/i18n/client";
import DescriptionInput from '../product/DescriptionInput';
import FileUploadField from '../inputFields/FileUploadField';
import I18NextContext from '@/helper/i18NextContext';
import { useRouter } from 'next/navigation';

const PageForm = ({ updateId }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data: oldData, isLoading, refetch } = useQuery({queryKey: [`page/id`], queryFn: () => request({ url: `${PagesAPI}/${updateId}` }), enabled: false, select: (data) => data?.data });
    useEffect(() => {
        updateId && refetch();
    }, [updateId]);

    const router = useRouter()
    if (updateId && isLoading) return <Loader />;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: updateId ? oldData?.title || "" : "",
                content: updateId ? oldData?.content || "" : "",
                meta_title: updateId ? oldData?.meta_title || "" : "",
                meta_description: updateId ? oldData?.meta_description || "" : "",
                page_meta_image_id: updateId ? oldData?.page_meta_image_id?.id || "" : "",
                page_meta_image: updateId ? oldData?.page_meta_image || "" : "",
                status: updateId ? Boolean(Number(oldData?.status)) : true,
            }}
            validationSchema={YupObject({
                title: nameSchema
            })}
            onSubmit={() => {
                // Put Add Or Update Logic Here
                router.push(`/${i18Lang}/page`)
            }}>
            {({ values, setFieldValue, errors, touched }) => (
                <>
                    <Form id="blog" className="theme-form theme-form-2 mega-form">
                        <SimpleInputField nameList={[{ name: "title", placeholder: t("EnterTitle"), require: "true" }]} />
                        <DescriptionInput values={values} setFieldValue={setFieldValue} title={'Content'} nameKey="content" />
                        <SimpleInputField nameList={[{ name: "meta_title", title: "MetaTitle", placeholder: t("EnterTitle") }, { name: "meta_description", title: "MetaDescription", placeholder: t("EnterDescription") }]} />
                        <FileUploadField name="page_meta_image_id" title='PageMetaImage' id="page_meta_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
                        <CheckBoxField name="status" />
                        <FormBtn />
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default PageForm