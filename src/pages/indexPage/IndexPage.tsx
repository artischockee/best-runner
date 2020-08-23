import { css } from "@emotion/core";
import React from "react";
import { Button, Card, CardBody, Col, Container, Row, Table, Collapse, Spinner } from "reactstrap";
import AddRecordForm from "../../components/forms/addRecordForm";
import RecordsActions from "../../store/actions/recordsActions";
import { useDispatch, useSelector } from "react-redux";
import RecordsSelectors from "../../store/selectors/recordsSelectors";

export default function IndexPage() {
  const dispatch = useDispatch();
  const records = useSelector(RecordsSelectors.records);

  const [isAddRecordFormCollapseOpen, setIsAddRecordFormCollapseOpen] = React.useState(false);

  const getRecords = React.useCallback(() => {
    dispatch(RecordsActions.fetchRecords());
  }, []);

  React.useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <Container
      css={css`
        margin: 32px 0;
      `}
      fluid="md"
    >
      <Row className="justify-content-start">
        <Col xl={6} lg={6}>
          <Button
            color="primary"
            onClick={() => setIsAddRecordFormCollapseOpen((prevState) => !prevState)}
            style={{ marginBottom: "1rem" }}
          >
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
              {records.data.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{new Date(record.date).toLocaleDateString("en-US")}</td>
                  <td>{record.type}</td>
                  <td>{record.mileage.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {(records.isLoading || records.isError) && (
            <div className="d-flex flex-column align-items-center">
              {records.isLoading && <Spinner className="" />}
              {records.isError && (
                <React.Fragment>
                  <p>Error while fetching the data</p>
                  <Button onClick={getRecords}>Retry</Button>
                </React.Fragment>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
