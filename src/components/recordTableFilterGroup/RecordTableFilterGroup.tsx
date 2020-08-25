import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Form, Input } from "reactstrap";
import TrainingTypesSelectors from "../../store/selectors/trainingTypesSelectors";
import localiser from "../../services/locale";
import DictionariesUtils from "../../utils/dictionariesUtils";
import { RecordTable } from "../recordTable/types";

interface Props {
  onChange(fields: RecordTable.TableFilterableCols): void;
  onReset(): void;
}

export default function RecordTableFilterGroup(props: Props) {
  const trainingTypes = useSelector(TrainingTypesSelectors.trainingTypes);
  const { register, errors, getValues } = useForm<RecordTable.TableFilterableCols>();

  return (
    <Form
      inline
      className="mb-2"
      onReset={props.onReset}
      onChange={() => props.onChange(getValues())}
    >
      <p className="m-0 mr-2">Filters:</p>
      <Input
        type="select"
        name="type"
        defaultValue=""
        innerRef={register}
        invalid={errors.type != null}
      >
        <option value="">Training type</option>
        {trainingTypes.data.map((trainingType) => (
          <option key={trainingType.id} value={trainingType.id}>
            {localiser.ls(DictionariesUtils.getTrainingTypeL10nKey(trainingType.value), null, "en")}
          </option>
        ))}
      </Input>
      <Button outline type="reset" className="ml-3">
        Reset
      </Button>
    </Form>
  );
}
