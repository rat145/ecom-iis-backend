import FileUploadField from '../../inputFields/FileUploadField'
import CheckBoxField from '../../inputFields/CheckBoxField'
import { getHelperText } from '../../../utils/customFunctions/getHelperText'
import CommonRedirect from '../CommonRedirect'

const SliderProductBannerTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'leftSliderBannerLinkType', multipleNameKey: 'leftSliderBannerLink' }} setSearch={setSearch} />
            <FileUploadField name={'SliderProductBannerImage'} showImage={values['SliderProductBannerImage']} title='Image' id={'SliderProductBannerImage'} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('373x582px')} />
            <CheckBoxField name={`[content][slider_product_with_banner][left_side_banners][status]`} title="Status" />
        </>
    )
}

export default SliderProductBannerTab