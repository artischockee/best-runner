import { css } from "@emotion/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, Table } from "reactstrap";
import RecordsActions from "../../store/actions/recordsActions";
import RecordsSelectors from "../../store/selectors/recordsSelectors";
import { Redux } from "../../store/types";
import RecordRow, { Fields as RecordRowFields } from "../recordRow/RecordRow";
import RecordTableUtils from "./RecordTableUtils";
import RecordTableConstants from "./RecordTableConstants";
import { RecordTable as Types } from './types';

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

export default function RecordTable() {
  const dispatch: Redux.Dispatch = useDispatch();
  const records = useSelector(RecordsSelectors.records);

  const [tableColsSort, _dispatch] = React.useReducer(
    RecordTableUtils.tableColsSortReducer,
    RecordTableConstants.tableColsSortInitialState
  );

  const getRecords = React.useCallback(() => {
    const purifiedTableColsSort = Object.entries(tableColsSort).reduce((acc, entry) => {
      if (entry[1] == null) return acc;

      return { ...acc, [entry[0]]: entry[1] };
    }, {});

    dispatch(RecordsActions.fetchRecords(purifiedTableColsSort));
  }, [tableColsSort]);

  React.useEffect(getRecords, [getRecords]);

  function handleSwitchColSortOrder(colName: keyof Types.TableColsSortState) {
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
    <React.Fragment>
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
    </React.Fragment>
  );
}
