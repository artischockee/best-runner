import React from "react";
import { Button, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import DateUtils from "../../utils/dateUtils";
import RecordRowHooks from "./RecordRowHooks";
import localiser from "../../services/locale";
import DictionariesUtils from "../../utils/dictionariesUtils";

interface Props {
  id: number;
  index: number;
  date: string; // ISO format
  type: number;
  mileage: number;
  onDelete(id: number): void;
}

interface Fields {
  date: string;
  type: string | number;
  mileage: number;
}

export default function RecordRow(props: Props) {
  const [trainingTypes, getTypeLabelById] = RecordRowHooks.useTrainingTypes();

  const { register, errors, handleSubmit } = useForm<Fields>();
  const [isEditing, setIsEditing] = React.useState(false);

  function handleSaveChanges(data: Fields) {
    console.log("submit changes", data);
    setIsEditing(false);
  }

  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (confirmed) props.onDelete(props.id);
  }

  function renderAsEditable() {
    return (
      <React.Fragment>
        <td className="align-middle">{props.index}</td>
        <td className="align-middle">
          <Input
            type="date"
            name="date"
            defaultValue={DateUtils.getISODate(props.date) || DateUtils.getTodayDateISO()}
            innerRef={register({ required: true })}
          />
        </td>
        <td className="align-middle">
          <Input
            type="select"
            name="type"
            defaultValue={props.type}
            innerRef={register({ required: true })}
          >
            <option disabled value="">
              Select an option
            </option>
            {trainingTypes.data.map((trainingType) => (
              <option key={trainingType.id} value={trainingType.value}>
                {localiser.ls(
                  DictionariesUtils.getTrainingTypeL10nKey(trainingType.value),
                  null,
                  "en"
                )}
              </option>
            ))}
          </Input>
        </td>
        <td className="align-middle">
          <Input type="text" value={props.mileage} />
        </td>
        <td className="align-middle">
          <Button color="link accent" className="mr-1" onClick={handleSubmit(handleSaveChanges)}>
            Save
          </Button>
          <Button color="link danger" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </td>
      </React.Fragment>
    );
  }

  function renderAsNormal() {
    return (
      <React.Fragment>
        <td className="align-middle">{props.index}</td>
        <td className="align-middle">{new Date(props.date).toLocaleDateString("en-US")}</td>
        <td className="align-middle">{localiser.l(getTypeLabelById(props.type) || "")}</td>
        <td className="align-middle">{props.mileage.toFixed(2)}</td>
        <td className="align-middle">
          <Button color="link accent" className="mr-1" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button color="link danger" onClick={handleDelete}>
            Delete
          </Button>
        </td>
      </React.Fragment>
    );
  }

  return <tr>{isEditing ? renderAsEditable() : renderAsNormal()}</tr>;
}
