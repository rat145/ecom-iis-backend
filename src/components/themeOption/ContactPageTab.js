import { getHelperText } from "../../utils/customFunctions/getHelperText"
import FileUploadField from "../inputFields/FileUploadField"
import ContactWrapper from "./ContactWrapper"

const ContactPageTab = ({ values, setFieldValue }) => {
    return (
        <>
            <FileUploadField name="contactUsImage" title='Image' id="contactUsImage" showImage={values['contactUsImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('460x388px')} />
            <ContactWrapper contactDetails={{ value: "detail_1", title: "Detail1" }} />
            <ContactWrapper contactDetails={{ value: "detail_2", title: "Detail2" }} />
            <ContactWrapper contactDetails={{ value: "detail_3", title: "Detail3" }} />
            <ContactWrapper contactDetails={{ value: "detail_4", title: "Detail4" }} />
        </>
    )
}
export default ContactPageTab