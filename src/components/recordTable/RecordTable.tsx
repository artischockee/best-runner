import { css } from "@emotion/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, Table } from "reactstrap";
import RecordsActions from "../../store/actions/recordsActions";
import RecordsSelectors from "../../store/selectors/recordsSelectors";
import { Redux } from "../../store/types";
import { ReactComponent as SVGTriangle } from "../../static/images/triangle.svg";
import RecordRow, { Fields as RecordRowFields } from "../recordRow/RecordRow";
import RecordTableFilterGroup from "../recordTableFilterGroup";
import RecordTableUtils from "./RecordTableUtils";
import RecordTableConstants from "./RecordTableConstants";
import { RecordTable as Types } from "./types";
import CommonUtils from "../../utils/commonUtils";

const sortableCellCss = css`
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const sortIconCss = css`
  margin-left: 0.5em;
  width: 0.85em;
  height: 0.85em;
  fill: #808080;
  transition: transform 150ms ease-out;
`;

export default function RecordTable() {
  const dispatch: Redux.Dispatch = useDispatch();
  const records = useSelector(RecordsSelectors.records);

  const [tableColsSort, _dispatch] = React.useReducer(
    RecordTableUtils.tableColsSortReducer,
    RecordTableConstants.tableColsSortInitialState
  );

  const getRecords = React.useCallback(
    (params = tableColsSort) => {
      const purifiedTableColsSort = CommonUtils.getPurifiedObject(params);

      dispatch(RecordsActions.fetchRecords(purifiedTableColsSort));
    },
    [tableColsSort]
  );

  React.useEffect(getRecords, [getRecords]);

  function handleSwitchColSortOrder(colName: keyof Types.TableColsSortState) {
    _dispatch({
      type: "SWITCH_ORDER",
      colName,
      payload: tableColsSort[colName] === "asc" ? "desc" : "asc",
    });
  }

  function handleSetFilterValues(values: Types.TableFilterableCols) {
    _dispatch({
      type: "SET_FILTER",
      payload: CommonUtils.convertEmptyStringFieldsToNull(values),
    });
  }

  function handleResetFilterValues() {
    _dispatch({ type: "RESET_FILTER" });
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

  function renderSortableHeadCell(colName: keyof Types.TableColsSortState, title: string) {
    return (
      <th css={sortableCellCss} onClick={() => handleSwitchColSortOrder(colName)}>
        {title}
        {tableColsSort[colName] != null && (
          <SVGTriangle
            css={css`
              ${sortIconCss};
              transform: ${tableColsSort[colName] === "desc" ? "rotateX(180deg)" : "none"};
            `}
          />
        )}
      </th>
    );
  }

  return (
    <React.Fragment>
      <RecordTableFilterGroup onChange={handleSetFilterValues} onReset={handleResetFilterValues} />
      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            {renderSortableHeadCell("date", "Date")}
            <th>Training type</th>
            {renderSortableHeadCell("mileage", "Mileage")}
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
