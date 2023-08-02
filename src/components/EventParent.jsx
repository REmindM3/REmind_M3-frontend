import { useState } from "react";
import EventForm from "./EventForm";
import EventDisplay from "./EventDisplay";

export default function EventParent(props) {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div id="editButton">
      {editMode ? <EventForm id={props.id} /> : <EventDisplay id={props.id} />}
      <button onClick={toggleEditMode}>Toggle Edit Mode</button>
    </div>
  );
}
