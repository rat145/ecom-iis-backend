"use client";
import CouponForm from "@/components/coupon/CouponForm";
import { useParams } from "next/navigation";

const CouponUpdate = () => {
  const params = useParams();

  return params?.updateId && <CouponForm updateId={params?.updateId} title={"UpdateCoupon"} />;
};

export default CouponUpdate;
