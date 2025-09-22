import React, { useContext } from 'react'
import TableWrapper from '../../utils/hoc/TableWrapper'
import Loader from '../commonComponent/Loader';
import ShowTable from '../table/ShowTable';
import { RefundAPI } from '../../utils/axiosUtils/API';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from '@/helper/i18NextContext';

const AllRefundTable = ({ data, ...props }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const headerObj = {
        checkBox: false, isOption: true, noEdit: true, isSerial: true,
        optionHead: { title: "Action", type: 'View', url: RefundAPI, message: "Refund Status Updated Successfully", showModalData: data, modalTitle: t("Refund"), permissionKey: "refund" },
        column: [
            { title: "OrderNumber", apiKey: "order_id" },
            { title: "ConsumerName", apiKey: "consumer_name", sorting: true, sortBy: "desc" },
            { title: "Reason", apiKey: "reason" },
            { title: "Status", apiKey: "refund_status" },
            { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" },
        ],
        data: data || []
    };
    let refunds = headerObj?.data?.filter((element) => {
        element.consumer_name = element?.user?.name
        element.order_id = <span className="fw-bolder">#{element?.order?.order_number}</span>
        element.refund_status = element.status ? <div className={`status-${element.status}`}><span>{element.status.replace(/_/g, " ")}</span></div> : '-';
        return element;
    });
    headerObj.data = headerObj ? refunds : [];
    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWrapper(AllRefundTable)