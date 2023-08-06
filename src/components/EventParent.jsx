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
      {editMode ? <EventForm _id={props._id} /> : <EventDisplay _id={props._id} />}
      <button onClick={toggleEditMode}>Toggle Edit Mode</button>
    </div>
  );
}
