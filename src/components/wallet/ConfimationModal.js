import ShowModal from '../../elements/alerts&Modals/Modal';
import Btn from '../../elements/buttons/Btn';
import { RiQuestionLine } from 'react-icons/ri';
import { useTranslation } from "@/app/i18n/client";
import { useContext } from 'react';
import I18NextContext from '@/helper/i18NextContext';

const ConfimationModal = ({ modal, setModal, setCreditOrDebit, creditOrDebit, handleSubmit, setIsValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const onSubmit = (values) => {
        setIsValue(values);
        handleSubmit()
        setCreditOrDebit("")
        setModal(false)
    }
    return (
        <ShowModal
            open={modal}
            close={false}
            buttons={
                <>
                    <Btn
                        title="No"
                        onClick={() => {
                            setModal(false);
                        }}
                        className="btn--no btn-md fw-bold"
                    />
                    <Btn
                        title="Yes"
                        onClick={() => onSubmit(creditOrDebit)}
                        className="btn-theme btn-md fw-bold"
                    />
                </>
            }>
            <div className="remove-box">
                <RiQuestionLine className="icon-box wo-bg" />
                <h5 className="modal-title">{t("Confirmation")}</h5>
                <p>{t("Areyousureyouwanttoproceed?")} </p>
            </div>
        </ShowModal>
    )
}

export default ConfimationModal