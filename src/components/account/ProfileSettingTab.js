import React, { useContext } from 'react'
import { Form, Formik } from 'formik';
import SimpleInputField from '../inputFields/SimpleInputField';
import FileUploadField from '../inputFields/FileUploadField';
import Btn from '../../elements/buttons/Btn';
import { YupObject, nameSchema, phoneSchema } from '../../utils/validation/ValidationSchemas';
import AccountContext from '../../helper/accountContext';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import { AllCountryCode } from '../../data/AllCountryCode';
import { useTranslation } from "@/app/i18n/client";
import { getHelperText } from '../../utils/customFunctions/getHelperText';
import I18NextContext from '@/helper/i18NextContext';

const ProfileSettingTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { accountData, setAccountContextData } = useContext(AccountContext)
    return (
        <Formik
            enableReinitialize
            initialValues={{
                profile_image_id: accountData ? accountData?.profile_image_id : "",
                profile_image: accountData ? accountData.profile_image : "",
                name: accountData ? accountData.name : "",
                email: accountData ? accountData.email : "",
                phone: accountData ? accountData.phone : "",
                country_code: accountData ? `${accountData?.country_code}` : "91"
            }}
            validationSchema={YupObject({
                name: nameSchema,
                email: nameSchema,
                phone: phoneSchema
            })}
            onSubmit={(values) => {
                values["_method"] = "put";
                if (values['profile_image'] == "") {
                    values['profile_image_id'] = null
                }
                setAccountContextData({ name: values["name"], image: values["profile_image"] })
                // Put Add Or Update Logic Here
            }}>
            {({ values, setFieldValue, errors }) => (
                <Form className="theme-form theme-form-2 mega-form row">
                    <FileUploadField name="profile_image_id" uniquename={values?.profile_image} errors={errors} id="profile_image_id" title="Avatar" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('500x100px')} />
                    <SimpleInputField nameList={[{ name: 'name', title: 'Name', require: "true", placeholder: t("EnterName") }]} />
                    <SimpleInputField nameList={[{ name: 'email', title: 'Email', require: "true", placeholder: t("EnterEmail") }]} />
                    <div className='country-input mb-4'>
                        <SimpleInputField nameList={[{ name: 'phone', title: 'Phone', require: "true", type: "number" }]} />
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "country_code",
                                    notitle: "true",
                                    inputprops: {
                                        name: "country_code",
                                        id: "country_code",
                                        options: AllCountryCode,
                                    },
                                },
                            ]}
                        />
                    </div>
                    <Btn className="btn btn-theme ms-auto d-inline-block w-auto" type="submit" title="Save" />
                </Form>
            )}
        </Formik>
    )
}

export default ProfileSettingTab