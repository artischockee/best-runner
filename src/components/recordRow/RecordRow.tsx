import React from "react";
import { Button } from "reactstrap";

interface Props {
  id: number;
  index: number;
  date: string;
  type: string;
  mileage: number;
  onDelete(id: number): void;
}

export default function RecordRow(props: Props) {
  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (confirmed) props.onDelete(props.id);
  }

  return (
    <tr>
      <td className="align-middle">{props.index}</td>
      <td className="align-middle">{new Date(props.date).toLocaleDateString("en-US")}</td>
      <td className="align-middle">{props.type}</td>
      <td className="align-middle">{props.mileage.toFixed(2)}</td>
      <td className="align-middle">
        <Button outline color="primary" size="sm" className="mr-1">
          Edit
        </Button>
        <Button outline color="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
