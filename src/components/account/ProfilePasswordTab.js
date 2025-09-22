import { Form, Formik } from 'formik';
import { YupObject, nameSchema } from '../../utils/validation/ValidationSchemas';
import SimpleInputField from '../inputFields/SimpleInputField';
import Btn from '../../elements/buttons/Btn';
import { useTranslation } from "@/app/i18n/client";
import { useContext } from 'react';
import I18NextContext from '@/helper/i18NextContext';

const ProfilePasswordTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <Formik
            enableReinitialize
            initialValues={{
                current_password: "",
                password: "",
                password_confirmation: ""
            }}
            validationSchema={YupObject({
                current_password: nameSchema,
                password: nameSchema,
                password_confirmation: nameSchema
            })}
            onSubmit={(values) => {
                values["_method"] = "put";
                // Put Add Or Update Logic Here
            }}>
            {({ values, setFieldValue }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <SimpleInputField nameList={[{ name: 'current_password', title: 'CurrentPassword', placeholder: t('EnterCurrentPassword'), require: "true" }, { name: 'password', title: 'Password', require: "true", placeholder: t("EnterNewPassword") }, { name: 'password_confirmation', title: 'ConfirmPassword', require: "true", placeholder: t("EnterConfirmPassword") }]} />
                    <Btn className="btn btn-theme ms-auto mt-4" type="submit" title="Save" />
                </Form>
            )}
        </Formik>
    )
}

export default ProfilePasswordTab