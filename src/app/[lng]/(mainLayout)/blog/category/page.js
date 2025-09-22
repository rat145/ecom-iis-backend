'use client'
import { useContext, useRef, useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import CategoryForm from '@/components/category/CategoryForm'
import TreeForm from '@/components/category/TreeForm'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'

const BlogCategory = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [resetData, setResetData] = useState(false)
    const refRefetch = useRef()
    return (
        <Row >
            <Col xl="4">
                <Card>
                    <CardBody>
                        <TreeForm type={"post"} ref={refRefetch} />
                    </CardBody>
                </Card>
            </Col>
            <Col xl="8">
                <Card>
                    <CardBody>
                        <div className="title-header option-title">
                            <h5>{t("AddCategory")}</h5>
                        </div>
                        <CategoryForm key={resetData} type={"post"} setResetData={setResetData} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
export default BlogCategory