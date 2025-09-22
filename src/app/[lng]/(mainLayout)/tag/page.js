"use client";
import React, { useState } from "react";
import { Col } from "reactstrap";
import AllTagsTable from "@/components/tag/AllTagsTable";
import { tag } from "@/utils/axiosUtils/API";

const AllTags = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <AllTagsTable
        url={tag}
        moduleName="Tag"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        type={"product"}
      />
    </Col>
  );
};

export default AllTags;
