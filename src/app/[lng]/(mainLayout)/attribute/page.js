"use client";
import React, { useState } from "react";
import { Col } from "reactstrap";
import AttributesTable from "@/components/attribute/AttributesTable";
import { attribute } from "@/utils/axiosUtils/API";

const AllAttributes = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AttributesTable
        url={attribute}
        moduleName="Attribute"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default AllAttributes;
