import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Input, Row, Col, Label } from 'reactstrap'
import { HeaderOption } from '../../data/TabTitleListData'
import CheckBoxField from '../inputFields/CheckBoxField'
import InputWrapperComponent from '../inputFields/InputWrapperComponent'
import SimpleInputField from '../inputFields/SimpleInputField'
import { product } from '../../utils/axiosUtils/API'
import Loader from '../commonComponent/Loader'
import request from '../../utils/axiosUtils'
import MultiSelectField from '../inputFields/MultiSelectField'
import { useContext } from 'react'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const HeaderTab = ({ values, setFieldValue, categoryData }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const handleClick = (val) => {
    setFieldValue("[options][header][header_options]", val.value)
  }
  const { data, isLoading } = useQuery({queryKey: [product], queryFn: () => request({ url: product, params: { status: 1 } }), refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  if (isLoading) return <Loader />
  return (
    <>
      <Row>
        <Col sm="9">
          <InputWrapperComponent name={"HeaderOption"} classes="d-flex">
            <ul className="radio-type-sec">
              {HeaderOption.map((elem, i) => (
                <li key={i}>
                  <div className="selection-box">
                    <Input name="Header" type="radio" id={elem.id} checked={values['options']?.['header']?.['header_options'] == elem.value ? true : false} onChange={() => handleClick(elem)} />
                    <Label className='w-100' htmlFor={elem.id}>
                      <div>
                        <Image src={elem.dummyImg} className="img-fluid dummy-img" alt={elem.value} width={619} height={88} />
                        <Image src={elem.realImg} className="img-fluid real-img" alt={elem.value} width={619} height={88} />
                      </div>
                    </Label>
                  </div>
                </li>
              ))}
            </ul>
          </InputWrapperComponent>
          <CheckBoxField name="[options][header][sticky_header_enable]" title="StickyHeader" />
          <CheckBoxField name="[options][header][page_top_bar_enable]" title="Topbar" />
          {
            values['options']?.['header']?.['page_top_bar_enable'] &&
            values['options']?.['header']?.['top_bar_content']?.map((elem, i) => (
              <SimpleInputField
                nameList={[
                  {
                    name: `[options][header][top_bar_content]${i}[content]`, title: `TopbarContent${i + 1}`, placeholder: t("EnterTopbarContent"), helpertext: "*Utilize HTML tags for custom content presentation."
                  },
                ]} key={i} />
            ))
          }
          <CheckBoxField name="[options][header][page_top_bar_dark]" title="TopbarDark" />
          <SimpleInputField
            nameList={[
              { name: '[options][header][support_number]', title: "SupportNumber", placeholder: t("EnterSupportNumber") },
            ]} />
          <MultiSelectField values={values} setFieldValue={setFieldValue} name='today_deals' title="TodaysDeals" data={data} helpertext="*Choose products to display in the deal popup on the header. Select up to 3 recommended products." />
          <MultiSelectField values={values} setFieldValue={setFieldValue} name='headerCategories' title={'Categories'} data={categoryData || []} />
        </Col>
      </Row>
    </>
  )
}

export default HeaderTab