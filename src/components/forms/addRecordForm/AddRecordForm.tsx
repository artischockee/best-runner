import React from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  FormFeedback,
  FormText,
} from "reactstrap";
import { useForm } from "react-hook-form";
import DateUtils from "../../../utils/dateUtils";
import { useDispatch, useSelector } from "react-redux";
import TrainingTypesSelectors from "../../../store/selectors/trainingTypesSelectors";
import TrainingTypesActions from "../../../store/actions/trainingTypesActions";
import DictionariesUtils from "../../../utils/dictionariesUtils";
import RecordsActions from "../../../store/actions/recordsActions";
import { Redux } from "../../../store/types";
import localiser from "../../../services/locale";

interface Fields {
  trainingDate: string;
  trainingType: string;
  trainingMileage: number;
  trainingComments: string;
}

export default function AddRecordForm() {
  const dispatch: Redux.Dispatch = useDispatch();
  const trainingTypes = useSelector(TrainingTypesSelectors.trainingTypes);

  const { register, errors, handleSubmit } = useForm<Fields>();

  React.useEffect(() => {
    if (!trainingTypes.requestedOnce) {
      dispatch(TrainingTypesActions.fetchTrainingTypes());
    }
  }, []);

  function submitRecord(data: Fields) {
    dispatch(
      RecordsActions.createRecord({
        date: data.trainingDate,
        type: data.trainingType,
        mileage: data.trainingMileage,
        comments: data.trainingComments,
      })
    ).then((result) => {
      if (result.type.endsWith("rejected")) {
        return window.alert("Error while creating a new record");
      }
      dispatch(RecordsActions.fetchRecords());
    });
  }

  return (
    <Form onSubmit={handleSubmit(submitRecord)}>
      <FormGroup>
        <Label for="trainingDate">Date of training</Label>
        <Input
          id="trainingDate"
          type="date"
          name="trainingDate"
          defaultValue={DateUtils.getTodayDateISO()}
          innerRef={register({ required: true })}
          invalid={errors.trainingDate != null}
        />
        <FormFeedback>Invalid date</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="trainingType">Training type</Label>
        <Input
          id="trainingType"
          type="select"
          name="trainingType"
          defaultValue=""
          innerRef={register({ required: true })}
          invalid={errors.trainingType != null}
        >
          <option disabled value="">
            Select an option
          </option>
          {trainingTypes.data.map((trainingType) => (
            <option key={trainingType.id} value={trainingType.value}>
              {/* TODO: use stable localiser */}
              {localiser.ls(
                DictionariesUtils.getTrainingTypeL10nKey(trainingType.value),
                null,
                "en"
              )}
            </option>
          ))}
        </Input>
        <FormFeedback>You must select the type</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="trainingMileage">Mileage</Label>
        <InputGroup>
          <Input
            id="trainingMileage"
            type="text"
            name="trainingMileage"
            placeholder="5,4"
            innerRef={register({ required: true, pattern: /^[0-9]+[,.]?[0-9]*$/i, min: 0 })}
            invalid={errors.trainingMileage != null}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>km</InputGroupText>
          </InputGroupAddon>
          <FormFeedback>You must specify valid number</FormFeedback>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for="trainingComments">Comments</Label>
        <Input
          id="trainingComments"
          type="textarea"
          name="trainingComments"
          placeholder="Yesterday I felt awesome"
          innerRef={register({ maxLength: 3000 })}
        />
        <FormText>Max length - 3000 symbols</FormText>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
