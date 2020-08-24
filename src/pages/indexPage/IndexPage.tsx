import { css } from "@emotion/core";
import React from "react";
import { Button, Card, CardBody, Col, Container, Row, Table, Collapse, Spinner } from "reactstrap";
import AddRecordForm from "../../components/forms/addRecordForm";
import RecordsActions from "../../store/actions/recordsActions";
import { useDispatch, useSelector } from "react-redux";
import RecordsSelectors from "../../store/selectors/recordsSelectors";
import RecordRow from "../../components/recordRow";
import { Redux } from "../../store/types";
import { ReactComponent as SVGPlus } from "../../static/images/plus.svg";
import { Fields as RecordRowFields } from "../../components/recordRow/RecordRow";

export default function IndexPage() {
  const dispatch: Redux.Dispatch = useDispatch();
  const records = useSelector(RecordsSelectors.records);

  const [isAddRecordFormCollapseOpen, setIsAddRecordFormCollapseOpen] = React.useState(false);

  const getRecords = React.useCallback(() => {
    dispatch(RecordsActions.fetchRecords());
  }, []);

  React.useEffect(() => {
    getRecords();
  }, [getRecords]);

  function handleChangeRecord(recordId: number, recordData: RecordRowFields) {
    return new Promise((resolve, reject) => {
      dispatch(RecordsActions.editRecord({ recordId, data: recordData })).then((result) => {
        if (result.type.endsWith("rejected")) {
          reject();
          return window.alert("Error while editing the record");
        }

        resolve(() => dispatch(RecordsActions.fetchRecords()));
      });
    });
  }

  function handleDeleteRecord(recordId: number) {
    dispatch(RecordsActions.deleteRecord(recordId)).then((result) => {
      if (result.type.endsWith("rejected")) {
        return window.alert("Error while deleting the record");
      }
      dispatch(RecordsActions.fetchRecords());
    });
  }

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
                margin-right: .5em;
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
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Training type</th>
                <th>Mileage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.data.map((record, index) => (
                <RecordRow
                  key={record.id}
                  id={record.id}
                  index={index + 1}
                  date={record.date}
                  type={record.type}
                  mileage={record.mileage}
                  onChange={handleChangeRecord}
                  onDelete={handleDeleteRecord}
                />
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
