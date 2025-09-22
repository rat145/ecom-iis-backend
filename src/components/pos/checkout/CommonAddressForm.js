import SimpleInputField from '../../inputFields/SimpleInputField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import { Form, Formik } from 'formik'
import { YupObject, nameSchema, phoneSchema } from '../../../utils/validation/ValidationSchemas'
import { country } from '../../../utils/axiosUtils/API'
import { useQuery } from '@tanstack/react-query'
import request from '../../../utils/axiosUtils'
import Btn from '../../../elements/buttons/Btn'
import { AllCountryCode } from '../../../data/AllCountryCode'
import { useContext } from 'react'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const CommonAddressForm = ({ type, updateId, setModal }) => {
    const { data } = useQuery({queryKey: [country], queryFn: () => request({ url: country }), select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })) });
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <Formik
                initialValues={{
                    title: "",
                    street: "",
                    country_id: data ? data : "",
                    state_id: "",
                    city: "",
                    pincode: "",
                    phone: "",
                    type: type,
                    user_id: updateId,
                    country_code: '91'
                }}
                validationSchema={YupObject({
                    title: nameSchema,
                    street: nameSchema,
                    city: nameSchema,
                    country_id: nameSchema,
                    state_id: nameSchema,
                    pincode: nameSchema,
                    phone: phoneSchema,
                })}
                onSubmit={(values) => {
                    values['pincode'] = values['pincode'].toString();
                    setAddress((prev) => [...prev, values])
                    setModal(false)
                    // Put Your Logic Here
                }}>
                {({ values, setFieldValue }) => (
                    <Form className='row'>
                        <SimpleInputField nameList={[{ name: "title", placeholder: t("EnterTitle"), title: "Title", require: "true" }, { name: "street", placeholder: "Enter Address", title: "Address", require: "true" }]} />
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "country_id", title: "Country",
                                    require: "true",
                                    inputprops: {
                                        name: "country_id",
                                        id: "country_id",
                                        options: data,
                                        defaultOption: "Select state",
                                    },
                                    disabled: values?.["country_id"] ? false : true,
                                },
                                {
                                    name: "state_id", title: "State",
                                    require: "true",
                                    inputprops: {
                                        name: "state_id",
                                        id: "state_id",
                                        options: values?.["country_id"] ? data.filter((country) => Number(country.id) === Number(values?.["country_id"]))?.[0]?.["state"] : [],
                                        defaultOption: "Select state",
                                    },
                                    disabled: values?.["country_id"] ? false : true,
                                },
                            ]}
                        />
                        <SimpleInputField nameList={[{ name: "city", title: "City", require: "true", placeholder: "Enter City" }]} />
                        <SimpleInputField nameList={[{ name: "pincode", title: "Pincode", require: "true", type: 'number', placeholder: "Enter Pincode" }]} />
                        <div className='country-input mb-4'>
                            <SimpleInputField nameList={[{ name: "phone", type: "number", placeholder: "Enter Phone Number", require: "true" }]} />
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
                            /></div>
                        <div className="ms-auto justify-content-end dflex-wgap save-back-button">
                            <Btn className="me-2 btn-outline btn-lg" title="Cancel" onClick={() => { setModal(false) }} />
                            <Btn className="btn-primary btn-lg" type="submit" title="Submit" />
                        </div>
                    </Form>
                )
                }
            </Formik>

        </>
    )
}

export default CommonAddressForm