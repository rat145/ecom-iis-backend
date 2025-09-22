import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import { blog, Category, tag } from "../../utils/axiosUtils/API";
import { dropDownScheme, nameSchema, YupObject } from "../../utils/validation/ValidationSchemas";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import MultiSelectField from "../inputFields/MultiSelectField";
import SimpleInputField from "../inputFields/SimpleInputField";
import I18NextContext from "@/helper/i18NextContext";
import DescriptionInput from "../product/DescriptionInput";
import { useTranslation } from "@/app/i18n/client";
import { getHelperText } from '../../utils/customFunctions/getHelperText';
import { useRouter } from "next/navigation";

const BlogForm = ({ updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const { data } = useQuery({queryKey: [Category], queryFn: () => request({ url: Category, params: { type: "post" } }), refetchOnWindowFocus: false, select: (data) => data.data.data });
  const { data: tagData } = useQuery({queryKey: [tag], queryFn: () => request({ url: tag, params: { type: "post" } }), refetchOnWindowFocus: false, select: (data) => data.data.data });
  const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery({queryKey: [blog + "/" + updateId], queryFn: () => request({ url: `${blog}/${updateId}` }), enabled: false, refetchOnWindowFocus: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  const router = useRouter()
  if (updateId && oldDataLoading) return null;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: updateId ? oldData?.data?.title || "" : "",
          description: updateId ? oldData?.data?.description || "" : "",
          content: updateId ? oldData?.data?.content || "" : "",
          meta_title: updateId ? oldData?.data?.meta_title || "" : "",
          meta_description: updateId ? oldData?.data?.meta_description || "" : "",
          blog_meta_image_id: updateId ? oldData?.data?.blog_meta_image?.id || "" : "",
          blog_meta_image: updateId ? oldData?.data?.blog_meta_image || "" : "",
          blog_thumbnail_id: updateId ? oldData?.data?.blog_thumbnail?.id || "" : undefined,
          blog_thumbnail: updateId ? oldData?.data?.blog_thumbnail || "" : "",
          categories: updateId ? oldData?.data?.categories.map((item) => item.id) || [] : [],
          tags: updateId ? oldData?.data?.tags.map((item) => item.id) || [] : [],
          is_featured: updateId ? Boolean(Number(oldData?.data?.is_featured)) : true,
          is_sticky: updateId ? Boolean(Number(oldData?.data?.is_sticky)) : true,
          status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        }}
        validationSchema={YupObject({
          title: nameSchema,
          blog_thumbnail_id: nameSchema,
          categories: dropDownScheme
        })}
        onSubmit={() => {
          // Put your Logic Here
          router.push(`/${i18Lang}/blog`)
        }}>
        {({ values, setFieldValue, errors, touched }) => (
          <>
            <Form id="blog" className="theme-form theme-form-2 mega-form">
              <SimpleInputField nameList={[{ name: "title", placeholder: t("EnterBlogTitle"), require: "true" }]} />
              <SimpleInputField nameList={[{ name: "description", placeholder: t("EnterBlogDescription") }]} />
              <DescriptionInput values={values} setFieldValue={setFieldValue} title={'Content'} nameKey="content" />
              <FileUploadField name="blog_thumbnail_id" title='Thumbnail' require='true' id="blog_thumbnail_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} helpertext={getHelperText("1500x700px")} />
              <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="categories" data={data} require='true' />
              <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="tags" data={tagData} />
              <CheckBoxField name="is_featured" title="Featured" />
              <CheckBoxField name="is_sticky" title="Sticky" />
              <SimpleInputField nameList={[{ name: "meta_title", placeholder: t("EnterMetaTitle") }, { name: "meta_description", placeholder: t("EnterMetaDescription"), type: 'textarea' }]} />
              <FileUploadField name="blog_meta_image_id" title='BlogMetaImage' id="blog_meta_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              <CheckBoxField name="status" />
              <FormBtn />
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default BlogForm;
