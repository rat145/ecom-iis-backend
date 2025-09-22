"use client";
import PermissionForm from "@/components/role/PermissionForm";
import { useParams } from "next/navigation";
import { Card, CardBody, Col, Row } from "reactstrap";

const UserUpdate = () => {
  const params = useParams();
  return (
    params?.updateId && (
      <Row>
        <Col xxl="8" lg="10" className="m-auto">
          <Card>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("UpdateRole")}</h5>
              </div>
              <PermissionForm updateId={params?.updateId} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default UserUpdate;
