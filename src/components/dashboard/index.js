import ProductStockReportTable from "./productStockReport/ProductStockReportTable"
import RecentOrderTable from "./recentOrders/RecentOrderTable"
import RevenueAndTopVendor from "./Revenue&TopVendor"
import TopDashSection from "./TopDashSection"

const MainDashboard = () => {
    return (
        <>
            <TopDashSection />
            <section>
                <RevenueAndTopVendor />
                <RecentOrderTable />
                <ProductStockReportTable />
            </section>
        </>
    )
}

export default MainDashboard