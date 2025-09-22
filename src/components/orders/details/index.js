import React, { useContext, useEffect, useState } from 'react'
import { OrderAPI, OrderStatusAPI } from '../../../utils/axiosUtils/API';
import request from '../../../utils/axiosUtils';
import { useQuery } from '@tanstack/react-query';
import OrderNumberTable from './OrderNumberTable';
import { Col, Row } from 'reactstrap';
import Loader from '../../commonComponent/Loader';
import OrderDetailsTable from './OrderDetailsTable';
import TrackingPanel from './TrackingPanel';
import RightSidebar from './RightSidebar';
import { useTranslation } from "@/app/i18n/client";
import usePermissionCheck from '../../../utils/hooks/usePermissionCheck';
import I18NextContext from '@/helper/i18NextContext';

const OrderDetailsContain = ({ updateId }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [edit] = usePermissionCheck(["edit"]);
    const [orderStatus, setOrderStatus] = useState("");
    // Getting Data from Order API for Order_Number
    const { data, isLoading, refetch } = useQuery({queryKey: ["category/" + updateId], queryFn: () => request({ url: `${OrderAPI}/${updateId}` }), refetchOnWindowFocus: false, select: (res) => { return res.data } });

    // Getting Data from Order Status API
    const { data: orderStatusData, refetch: orderStatusRefetch, isLoading: orderStatusLoader } = useQuery({queryKey: [OrderStatusAPI], queryFn: () => request({ url: OrderStatusAPI }), enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data });

    useEffect(() => {
        if (data) {
            setOrderStatus(data?.order_status)
        }
    }, [isLoading])

    useEffect(() => {
        refetch()
        orderStatusRefetch()
    }, [])
    if (isLoading || orderStatusLoader) return <Loader />;
    return (
        <Row>
            <Col xxl="9">
                {!data?.sub_orders?.length > 0 && <div className="mb-4">
                    <div className="tracking-panel">
                        <TrackingPanel orderStatusData={orderStatusData} orderStatus={orderStatus} />
                    </div>
                </div>}
                <Col sm="12">
                    <OrderNumberTable moduleName={`${t('OrderNumber')}: #${data?.order_number}`} data={data} orderStatusData={orderStatusData} setOrderStatus={setOrderStatus} orderStatus={orderStatus} edit={edit} />
                </Col>
                {data?.sub_orders?.length > 0 &&
                    <Col sm="12">
                        <OrderDetailsTable moduleName={`OrderDetails`} data={data} />
                    </Col>
                }
            </Col>
            <Col xxl="3">
                <RightSidebar data={data} />
            </Col>
        </Row>
    )
}

export default OrderDetailsContain