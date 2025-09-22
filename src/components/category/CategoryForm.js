import React, { useContext, useEffect, useMemo } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import request from "../../utils/axiosUtils";
import { nameSchema, YupObject } from "../../utils/validation/ValidationSchemas";
import SimpleInputField from "../inputFields/SimpleInputField";
import FileUploadField from "../inputFields/FileUploadField";
import FormBtn from "../../elements/buttons/FormBtn";
import CheckBoxField from "../inputFields/CheckBoxField";
import MultiSelectField from "../inputFields/MultiSelectField";
import Loader from "../commonComponent/Loader";
import CategoryContext from "../../helper/categoryContext";
import { Category } from "../../utils/axiosUtils/API";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

const CategoryForm = ({ setResetData, updateId, type }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter()
  const { categoryState } = useContext(CategoryContext)
  const { data: oldData, isLoading, refetch } = useQuery({queryKey: [updateId], queryFn: () => request({ url: `${Category}/${updateId}` }), enabled: false, refetchOnWindowFocus: false }
  );
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  const updatedData = useMemo(() => {
    return categoryState
  }, [categoryState])
  if (updateId && isLoading) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        description: updateId ? oldData?.data?.description || "" : "",
        category_image_id: updateId ? oldData?.data?.category_image?.id : "",
        category_icon_id: updateId ? oldData?.data?.category_icon?.id : "",
        category_image: updateId ? oldData?.data?.category_image : "",
        category_icon: updateId ? oldData?.data?.category_icon : "",
        commission_rate: updateId ? oldData?.data?.commission_rate : "",
        type: type,
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        parent_id: updateId
          ? Number(oldData?.data?.parent_id) || undefined
          : undefined,
      }}
      validationSchema={YupObject({
        name: nameSchema,
      })}
      onSubmit={() => {
        setResetData && setResetData(true)
        router.push(`/${i18Lang}/category`)
      }}
    >
      {({ setFieldValue, values, errors }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <SimpleInputField
              nameList={[
                { name: "name", title: "Name", placeholder: t("EnterCategoryName"), require: "true" }, { name: "description", placeholder: t("EnterCategoryDescription") },
              ]}
            />
            {type == "product" && (
              <SimpleInputField
                nameList={[{
                  name: "commission_rate", title: "CommissionRate", postprefix: "%", inputaddon: "true", placeholder: t("EnterCommissionRate"), min: "0", max: "100", type: "number", helpertext:
                    "*Define the percentage of earnings retained as commission.",
                },
                ]}
              />
            )}
            <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="parent_id" title={"SelectParent"} data={updatedData}
            />
            <FileUploadField name="category_image_id" id="category_image_id" title="Image" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue}
            />
            <FileUploadField name="category_icon_id" id="category_icon_id" title="Icon" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue}
            />
            <CheckBoxField name="status" />
            <FormBtn />
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default CategoryForm;
