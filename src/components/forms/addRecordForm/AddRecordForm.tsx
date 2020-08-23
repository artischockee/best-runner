import React from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

export default function AddRecordForm() {
  return (
    <Form>
      <FormGroup>
        <Label for="trainingDate">Date of training</Label>
        <Input id="trainingDate" type="date" name="trainingDate" />
      </FormGroup>
      <FormGroup>
        <Label for="trainingType">Training type</Label>
        <Input id="trainingType" type="select" name="trainingType">
          <option disabled selected>
            Select an option
          </option>
          <option>Running</option>
          <option>Cycling</option>
          <option>Skis</option>
          <option>Walking</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="trainingMileage">Mileage</Label>
        <InputGroup>
          <Input id="trainingMileage" type="number" name="trainingMileage" placeholder="0.15" />
          <InputGroupAddon addonType="append">
            <InputGroupText>km</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for="trainingComments">Text Area</Label>
        <Input id="trainingComments" type="textarea" name="trainingComments" />
      </FormGroup>
    </Form>
  );
}
