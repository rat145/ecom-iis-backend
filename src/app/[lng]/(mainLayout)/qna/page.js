"use client"
import React, { useState } from "react";
import { Col } from "reactstrap";
import { QuestionNAnswerAPI } from "@/utils/axiosUtils/API";
import QnATable from "@/components/qna/QnATable";

const QuestionAndAnswer = () => {
  const [isCheck, setIsCheck] = useState([]);
  return (
    <Col sm="12">
      <QnATable
        url={QuestionNAnswerAPI}
        moduleName="Q&A"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        keyInPermission={"question_and_answer"}
      />
    </Col>
  );
};

export default QuestionAndAnswer;
