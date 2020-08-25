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

const sortableCellCss = css`
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const sortLabelCss = css`
  font-size: 0.75em;
  font-weight: normal;
  color: #484848;
  vertical-align: top;
`;

interface TableColsSortState<T = "asc" | "desc" | null> {
  date: T;
  mileage: T;
}

type TableColsSortActions<T = "asc" | "desc"> = {
  type: "SWITCH_ORDER";
  colName: keyof TableColsSortState;
  payload: T;
};

const tableColsSortInitialState = {
  date: null,
  mileage: null,
};

function tableColsSortReducer(
  state: TableColsSortState,
  action: TableColsSortActions
): TableColsSortState {
  switch (action.type) {
    case "SWITCH_ORDER":
      return {
        ...tableColsSortInitialState,
        [action.colName]: action.payload,
      };
    default:
      throw new Error();
  }
}

export default function IndexPage() {
  const dispatch: Redux.Dispatch = useDispatch();
  const records = useSelector(RecordsSelectors.records);

  const [isAddRecordFormCollapseOpen, setIsAddRecordFormCollapseOpen] = React.useState(false);
  const [tableColsSort, _dispatch] = React.useReducer(
    tableColsSortReducer,
    tableColsSortInitialState
  );

  const getRecords = React.useCallback(() => {
    const purifiedTableColsSort = Object.entries(tableColsSort).reduce((acc, entry) => {
      if (entry[1] == null) return acc;

      return { ...acc, [entry[0]]: entry[1] };
    }, {});

    dispatch(RecordsActions.fetchRecords(purifiedTableColsSort));
  }, [tableColsSort]);

  React.useEffect(() => {
    getRecords();
  }, [getRecords]);

  function handleSwitchColSortOrder(colName: keyof TableColsSortState) {
    _dispatch({
      type: "SWITCH_ORDER",
      colName,
      payload: tableColsSort[colName] === "asc" ? "desc" : "asc",
    });
  }

  function handleChangeRecord(recordId: number, recordData: RecordRowFields) {
    return new Promise((resolve, reject) => {
      dispatch(RecordsActions.editRecord({ recordId, data: recordData })).then((result) => {
        if (result.type.endsWith("rejected")) {
          reject();
          return window.alert("Error while editing the record");
        }

        resolve(() => getRecords());
      });
    });
  }

  function handleDeleteRecord(recordId: number) {
    dispatch(RecordsActions.deleteRecord(recordId)).then((result) => {
      if (result.type.endsWith("rejected")) {
        return window.alert("Error while deleting the record");
      }
      getRecords();
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
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th css={sortableCellCss} onClick={() => handleSwitchColSortOrder("date")}>
                  Date <span css={sortLabelCss}>{tableColsSort.date}</span>
                </th>
                <th>Training type</th>
                <th css={sortableCellCss} onClick={() => handleSwitchColSortOrder("mileage")}>
                  Mileage <span css={sortLabelCss}>{tableColsSort.mileage}</span>
                </th>
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
                  <Button onClick={() => getRecords()}>Retry</Button>
                </React.Fragment>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
