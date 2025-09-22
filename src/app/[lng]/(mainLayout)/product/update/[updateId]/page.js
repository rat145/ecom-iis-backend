"use client";
import ProductForm from "@/components/product/ProductForm";
import { useParams } from "next/navigation";
import { useState } from "react";

const UpdateProduct = () => {
  const [resetKey, setResetKey] = useState(false);
  const params = useParams();
  return params?.updateId && <ProductForm setResetKey={setResetKey} updateId={params?.updateId} title={"EditProduct"} key={resetKey} />;
};

export default UpdateProduct;
