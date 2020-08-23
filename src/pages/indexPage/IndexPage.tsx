import { css } from "@emotion/core";
import React from "react";
import { Col, Container, Row, Table } from "reactstrap";

export default function IndexPage() {
  return (
    <Container
      css={css({
        margin: "32px 0",
      })}
      fluid
    >
      <Row className="justify-content-center">
        <Col xl={10}>
          <h1>Test H1</h1>

          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Training type</th>
                <th>Mileage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{new Date().toLocaleDateString("en-US")}</td>
                <td>Sprint</td>
                <td>3.0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{new Date(2020, 5, 20).toLocaleDateString("en-US")}</td>
                <td>Swimming</td>
                <td>1.15</td>
              </tr>
              <tr>
                <td>1</td>
                <td>{new Date().toLocaleDateString("en-US")}</td>
                <td>Sprint</td>
                <td>3.0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{new Date(2020, 5, 20).toLocaleDateString("en-US")}</td>
                <td>Swimming</td>
                <td>1.15</td>
              </tr>
              <tr>
                <td>1</td>
                <td>{new Date().toLocaleDateString("en-US")}</td>
                <td>Sprint</td>
                <td>3.0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{new Date(2020, 5, 20).toLocaleDateString("en-US")}</td>
                <td>Swimming</td>
                <td>1.15</td>
              </tr>
              <tr>
                <td>1</td>
                <td>{new Date().toLocaleDateString("en-US")}</td>
                <td>Sprint</td>
                <td>3.0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{new Date(2020, 5, 20).toLocaleDateString("en-US")}</td>
                <td>Swimming</td>
                <td>1.15</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
