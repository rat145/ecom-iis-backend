
import React, { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import request from '../../utils/axiosUtils';
import { RiTimeLine } from "react-icons/ri";
import { NotificationsAPI } from '../../utils/axiosUtils/API';
import Loader from '../commonComponent/Loader';
import { dateFormate } from '../../utils/customFunctions/DateFormate';
import BadgeContext from "../../helper/badgeContext";
import I18NextContext from '@/helper/i18NextContext';
import { useTranslation } from '@/app/i18n/client';

const NotificationsData = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { setNotification } = useContext(BadgeContext)
    const { data, isLoading, refetch } = useQuery({queryKey: [NotificationsAPI], queryFn: () =>
        request({ url: NotificationsAPI }), enabled: false, select: (res) => (res.data.data) }
    );
    useEffect(() => {
        refetch();
        setNotification(null)
    }, [])
    if (isLoading) return <Loader />
    return (
        <ul className='notification-setting'>
            {data?.map((notification, index) => (
                <li key={index}>
                    <h4>{t(notification.data.message)}</h4>
                    <h5><RiTimeLine /> {dateFormate(notification.created_at)}</h5>
                </li>
            ))}
        </ul>
    )
}

export default NotificationsData