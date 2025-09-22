import React, { useContext, useState } from 'react'
import { RiEyeLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation';
import ShowModal from '../../elements/alerts&Modals/Modal';
import Btn from '../../elements/buttons/Btn';
import usePermissionCheck from '../../utils/hooks/usePermissionCheck';
import ViewDetailBody from './ViewDetailBody';
import I18NextContext from '@/helper/i18NextContext';

const ViewDetails = ({ fullObj, tableData }) => {
    const [action] = usePermissionCheck(['action'], tableData?.permissionKey);
    const { i18Lang } = useContext(I18NextContext);
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const OnStatusClick = (value) => {
        setModal(false);
    }
    const redirectLink = () => {
        const order_number = fullObj?.order_number?.props?.children?.[1];
        router.push(`/${i18Lang}${tableData?.redirectUrl}/${order_number}`)
    }
    return (
        <>
            <div>
                <a onClick={() => {
                    tableData?.redirectUrl ? redirectLink() : setModal(true);
                }}><RiEyeLine className="ri-pencil-line" /></a>
            </div>
            <ShowModal open={modal} title={tableData.modalTitle} close={true} setModal={setModal}
                buttons={
                    <>
                        {(action && fullObj?.status == "pending") && <><Btn title="Rejected" onClick={() => OnStatusClick("rejected")} className="btn--no btn-md fw-bold" />
                            <Btn title="Approved" onClick={() => OnStatusClick("approved")} className="btn-theme btn-md fw-bold" />
                        </>}
                    </>
                }>
                <ViewDetailBody fullObj={fullObj} />
            </ShowModal>
        </>
    )
}

export default ViewDetails