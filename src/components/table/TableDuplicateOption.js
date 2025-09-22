import React, { useContext, useState } from 'react'
import { RiFileCopyLine, RiQuestionLine } from 'react-icons/ri';
import ShowModal from '../../elements/alerts&Modals/Modal';
import Btn from '../../elements/buttons/Btn';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from '@/helper/i18NextContext';

const TableDuplicateOption = ({ isCheck, setIsCheck }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [modal, setModal] = useState(false);
    const onSubmit = (productIds) => {
        // Put Your Login Here
        setModal(false)
        setIsCheck([])
    }
    return (
        <>
            <a className="align-items-center btn btn-outline btn-sm d-flex" onClick={() => setModal(true)}><RiFileCopyLine /> {t("Duplicate")}
            </a>
            <ShowModal open={modal} close={false}
                buttons={
                    <>
                        <Btn title="No" onClick={() => setModal(false)} className="btn--no btn-md fw-bold" />
                        <Btn title="Yes" onClick={() => onSubmit(isCheck)} className="btn-theme btn-md fw-bold" />
                    </>
                }>
                <div className="remove-box">
                    <RiQuestionLine className="icon-box wo-bg" />
                    <h5 className="modal-title">{t("Confirmation")}</h5>
                    <p>{t("Areyousureyouwanttoproceed?")} </p>
                </div>
            </ShowModal>
        </>
    )
}

export default TableDuplicateOption