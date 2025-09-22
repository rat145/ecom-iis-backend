import { RiDownload2Line, RiUpload2Line, RiUploadCloud2Line } from 'react-icons/ri'
import Btn from '../../elements/buttons/Btn'
import { useContext, useState } from 'react'
import ShowModal from '../../elements/alerts&Modals/Modal'
import { TabContent, TabPane } from 'reactstrap'
import { Form, Formik } from 'formik'
import { YupObject, requiredSchema } from '../../utils/validation/ValidationSchemas'
import FileUploadBrowser from '../inputFields/FileUploadBrowser'
import I18NextContext from '@/helper/i18NextContext'
import { useTranslation } from '@/app/i18n/client'


const ImportExport = ({ importExport }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [modal, setModal] = useState(false)
    const exportUser = () => {
        // Put Your Login Here
    }
    return (
        <>
            <a className="btn-outline btn btn-secondary" onClick={() => setModal(true)}><RiUpload2Line />{t("Import")}</a>
            <a className="btn-outline btn btn-secondary" onClick={() => exportUser()}><RiDownload2Line />{t("Export")}</a>

            <ShowModal open={modal} setModal={setModal} modalAttr={{ className: "media-modal modal-dialog modal-dialog-centered modal-xl" }} close={true} title={"InsertMedia"} noClass={true}
            >
                <TabContent>
                    <TabPane className={"fade active show"} id="select">
                        <div className="content-section drop-files-sec">
                            <div>
                                <RiUploadCloud2Line />
                                <Formik
                                    initialValues={{ users: "" }}
                                    validationSchema={YupObject({ users: requiredSchema })}
                                    onSubmit={(values, { resetForm }) => {
                                        let formData = new FormData();
                                        Object.values(values.users).forEach((el, i) => {
                                            formData.append(`users`, el);
                                        });
                                        setModal(false);
                                    }}>
                                    {({ values, setFieldValue, errors }) => (
                                        <Form className="theme-form theme-form-2 mega-form">
                                            <div>
                                                <div className="dflex-wgap justify-content-center ms-auto save-back-button">
                                                    <h2>{t("Dropfilesherepaste")}
                                                        <span>{t("or")}</span>
                                                        <FileUploadBrowser errors={errors} id="users" name="users" type="file" multiple={true} values={values} setFieldValue={setFieldValue} accept=".csv" />
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                {values?.users.length > 0 &&
                                                    <a href="#javascript" onClick={() => setFieldValue('users', "")}>{t("Clear")}</a>
                                                }
                                                <Btn type="submit" className="ms-auto" title="Insert Media" />
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </TabPane >
                </TabContent>
            </ShowModal >
        </>
    )
}

export default ImportExport