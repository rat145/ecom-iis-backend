import FileUploadField from "../../inputFields/FileUploadField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { getHelperText } from "../../../utils/customFunctions/getHelperText";
import MultiSelectField from "../../inputFields/MultiSelectField";

const CategoryIconListTab9 = ({ values, setFieldValue, categoryData }) => {
    return (
        <>
            <FileUploadField name="categoriesIconImage" title='Image' id="categoriesIconImage" showImage={values['categoriesIconImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('153x157px')} />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name="categoryIconList" title="Categories" data={categoryData} />
            <CheckBoxField name={`[content][categories_icon_list][status]`} title="Status" />
        </>
    )
}
export default CategoryIconListTab9