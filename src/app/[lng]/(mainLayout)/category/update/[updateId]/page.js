"use client";
import TableTitle from "@/components/table/TableTitle";
import CategoryForm from "@/components/category/CategoryForm";
import TreeForm from "@/components/category/TreeForm";
import { useParams } from "next/navigation";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const CategoryUpdate = () => {
  const params = useParams();

  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col xl="4">
            <Card>
              <CardBody>
                <TableTitle moduleName="Category" type={"product"} />
                <TreeForm type={"product"} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card>
              <CardBody>
                <TableTitle moduleName="UpdateCategory" onlyTitle={true} />
                {params?.updateId && <CategoryForm updateId={params?.updateId} type={"product"} />}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CategoryUpdate;
