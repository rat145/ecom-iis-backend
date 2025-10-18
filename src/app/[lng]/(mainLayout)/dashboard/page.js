"use client";
import dynamic from "next/dynamic";
import { withAdminAuth } from "@/utils/hoc/withAuth";
const MainDashboard = dynamic(
  () => import("../../../../components/dashboard"),
  { ssr: false }
);

const Dashboard = () => {
  return <MainDashboard />;
};

export default withAdminAuth(Dashboard);
