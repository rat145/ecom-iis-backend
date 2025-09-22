import dynamic from "next/dynamic";
import { DashboardChartAPI } from "../../utils/axiosUtils/API";
import request from "../../utils/axiosUtils";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from 'react';
import SettingContext from '../../helper/settingContext';
import { DashboardChartOptions } from "./ChartData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
})

const DashboardChart = () => {
    const { convertCurrency } = useContext(SettingContext)
    const { data, refetch, isLoading } = useQuery({queryKey: [DashboardChartAPI], queryFn: () => request({ url: DashboardChartAPI }), refetchOnWindowFocus: false, enabled: false, select: (data) => data?.data });
    useEffect(() => {
        refetch()
    }, [])
    return (
        <ReactApexChart options={DashboardChartOptions(data, convertCurrency).options} series={DashboardChartOptions(data, convertCurrency).series} type="line" height={350} />
    )
}

export default DashboardChart