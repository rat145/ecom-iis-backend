"use client";
import TableTitle from "@/components/table/TableTitle";
import CategoryForm from "@/components/category/CategoryForm";
import TreeForm from "@/components/category/TreeForm";
import { useParams } from "next/navigation";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const UpdateBlogCategory = () => {
  const params = useParams();

  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col xl="4">
            <Card>
              <CardBody>
                <TreeForm type={"post"} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <Card>
              <CardBody>
                {params?.updateId && (
                  <>
                    <TableTitle moduleName="UpdateCategory" onlyTitle={true} />
                    <CategoryForm updateId={params?.updateId} type={"post"} />
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UpdateBlogCategory;
