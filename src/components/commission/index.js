import React from 'react'
import TableWrapper from '../../utils/hoc/TableWrapper'
import ShowTable from '../table/ShowTable'
import Loader from '../commonComponent/Loader'

const AllCommissionTable = ({ data, ...props }) => {
    const headerObj = {
        checkBox: false,
        isOption: false,
        optionHead: { title: "Action" },
        column: [
            { title: "OrderID", apiKey: "order", subKey: ["order_number"] },
            { title: "StoreName", apiKey: "store", subKey: ["store_name"] },
            { title: "AdminCommission", apiKey: "admin_commission", type: "price" },
            { title: "VendorCommission", apiKey: "vendor_commission", type: "price" },
            { title: "CreateAt", apiKey: "created_at", sorting: true, sortBy: "desc", type: "date" }
        ],
        data: data || []
    };
    if (!data) return <Loader />;
    return <>
        <ShowTable {...props} headerData={headerObj} />
    </>
}

export default TableWrapper(AllCommissionTable)