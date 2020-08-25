import { css } from "@emotion/core";
import React from "react";
import { Button, Card, CardBody, Col, Container, Row, Collapse } from "reactstrap";
import AddRecordForm from "../../components/forms/addRecordForm";
import { ReactComponent as SVGPlus } from "../../static/images/plus.svg";
import RecordTable from "../../components/recordTable";

export default function IndexPage() {
  const [isAddRecordFormCollapseOpen, setIsAddRecordFormCollapseOpen] = React.useState(false);

  return (
    <Container
      css={css`
        margin: 32px 0;
      `}
      fluid="md"
    >
      <Row className="justify-content-start mb-4">
        <Col xl={6} lg={6}>
          <Button
            color="primary"
            className="d-flex align-items-center"
            onClick={() => setIsAddRecordFormCollapseOpen((prevState) => !prevState)}
            style={{ marginBottom: "1rem" }}
          >
            <SVGPlus
              css={css`
                margin-right: 0.5em;
                fill: currentColor;
              `}
            />
            Add new record
          </Button>
          <Collapse isOpen={isAddRecordFormCollapseOpen}>
            <Card>
              <CardBody>
                <AddRecordForm />
              </CardBody>
            </Card>
          </Collapse>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <h1>Your training records</h1>
          <RecordTable />
        </Col>
      </Row>
    </Container>
  );
}
