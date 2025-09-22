'use client'
import React, { useState } from "react";
import { Col } from "reactstrap";
import AllOrdersTable from "@/components/orders/AllOrdersTable";
import { OrderAPI } from "@/utils/axiosUtils/API";

const Order = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllOrdersTable url={OrderAPI} dateRange={true} moduleName="Order" isCheck={isCheck} setIsCheck={setIsCheck} />
    </Col>
  )
};

export default Order;
