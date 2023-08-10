import { useState, useContext } from "react";
import EventForm from "./EventForm";
import EventDisplay from "./EventDisplay";
import { EventDispatchContext } from "../contexts/EventsContext";

// Creating a functional component called EventParent that takes in props as an argument
export default function EventParent(props) {
  const [editMode, setEditMode] = useState(false);
  const globalEventsDispatch = useContext(EventDispatchContext);

  // Function to toggle editMode state variable
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    console.log("Deleting event with _id:", props._id);

    // Confirm with user before deleting event
    if (window.confirm("Are you sure you want to delete this event?")) {
      // Delete the event by sending a DELETE request to the server
      const response = await fetch(
        `http://localhost:3007/events/${props._id}`,
        {
          method: "delete",
        }
      );
      const data = await response.json();

      console.log(data);

      // Update global events data by dispatching a delete action with the id of the deleted event
      globalEventsDispatch({ type: "delete", id: props._id });

      window.location.reload();
    }
  };

  // Returning JSX to display an event and buttons for editing or deleting it
  return (
    <div className="card">
      <div className="card-header">Event: </div>
      <div className="card-body">
        {/* Conditionally render either EventForm or EventDisplay component based on editMode state variable */}
        {editMode ? (
          <EventForm _id={props._id} />
        ) : (
          <EventDisplay _id={props._id} showStatus={props.showStatus} />
        )}
        {/* Use showButtons prop to conditionally render the buttons */}
        {props.showButtons && (
          <>
            {/* Button to toggle editMode */}
            <button className="btn btn-primary" onClick={toggleEditMode}>
              {editMode ? "Cancel" : "Edit Event"}
            </button>
            {/* Button to delete event */}
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              Delete Event
            </button>
          </>
        )}
      </div>
    </div>
  );
}
