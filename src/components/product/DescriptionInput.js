import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap';
import EditorComponent from '../inputFields/EditorComponent';
import { ErrorMessage } from 'formik';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from '@/helper/i18NextContext';

const DescriptionInput = ({ values, setFieldValue, nameKey, errorMessage, title, helpertext }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [editorLoaded, setEditorLoaded] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    return (
        <>
            <div className="input-error">
                <Row className="mb-4 align-items-center g-md-4 g-2">
                    <Col sm={2}>
                        <span className="col-form-label form-label-title form-label">{t(title)} {errorMessage && <span className='theme-color ms-2 required-dot'>*</span>}</span>
                    </Col>
                    <Col sm={10}>
                    <EditorComponent name={nameKey}
                        value={values[nameKey]}
                        editorLoaded={editorLoaded}
                        onBlur={(data) => {
                            const plainText = data.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
                            if (plainText === "") {
                            setFieldValue(nameKey, "");
                            } else {
                            setFieldValue(nameKey, data);
                            }
                        }}
                        onChange={() => {}}
                        />
                        {helpertext && <p className='help-text'>{helpertext}</p>}
                        <ErrorMessage name={nameKey} render={(msg) => <div className='invalid-feedback d-block'>{t(errorMessage)}</div>} />
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default DescriptionInput