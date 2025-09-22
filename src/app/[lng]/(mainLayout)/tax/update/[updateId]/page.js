"use client";
import { useTranslation } from "@/app/i18n/client";
import TaxForm from "@/components/tax/TaxForm";
import I18NextContext from "@/helper/i18NextContext";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const TaxUpdate = () => {
  const params = useParams();
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  return (
    params?.updateId && (
      <Row>
        <Col sm="8" className="m-auto">
          <Card>
            <CardBody>
              <div className="card-header-2">
                <h5>{t("UpdateTax")}</h5>
              </div>
              <TaxForm updateId={params?.updateId} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default TaxUpdate;
