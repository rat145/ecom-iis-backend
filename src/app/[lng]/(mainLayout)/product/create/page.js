"use client";
import ProductForm from "@/components/product/ProductForm";

import { useState } from "react";

const ProductCreate = () => {
  const [resetKey, setResetKey] = useState(false);

  return (
    <ProductForm
      setResetKey={setResetKey}
      title={"AddProduct"}
      key={resetKey}
    />
  );
};

export default ProductCreate;
