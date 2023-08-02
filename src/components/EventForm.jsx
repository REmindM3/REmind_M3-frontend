/*
- ID (number)
- title (string)
- Description (string)
- IsCompleted (boolean)
- due date (JS Date)
- created at date (JS Date)
*/

import { useEffect, useState } from "react";
import { useEventData, useEventDispatch } from "../contexts/EventsContext";
import Button from "react-bootstrap/Button";

export default function EventForm(props) {
  // If this is null/no prop provided, we are creating a event
  // If id has value, we are editing a event.
  const { id } = props;

  // this is to read the global events data:
  const globalEventsData = useEventData();
  // The dispatch is our reducer, can edit global events data:
  const globalEventsDispatch = useEventDispatch();

  //   const [localId, setLocalId] = useState("");
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");
  const [localIsCompleted, setLocalIsCompleted] = useState("");
  const [localDueDate, setLocalDueDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [localCreatedAtDate, setLocalCreatedAtDate] = useState(Date.now());

  useEffect(() => {
    let tempEvent = globalEventsData.find((globalSpecificEvent) => {
      return globalSpecificEvent.id === id;
    });

    if (tempEvent) {
      // We found a event!!!
      setLocalTitle(tempEvent.title);
      setLocalDescription(tempEvent.description);
      setLocalIsCompleted(tempEvent.isCompleted);
      setLocalDueDate(tempEvent.dueDate);
      setLocalCreatedAtDate(tempEvent.localCreatedAtDate);
    }
  }, [globalEventsData, id]);

  const saveEventToGlobal = () => {
    let tempNewEvent = {
      id: id || globalEventsData.length + 1,
      title: localTitle,
      description: localDescription,
      isComplete: localIsCompleted,
      dueDate: localDueDate,
      createdAtDate: localCreatedAtDate,
    };

    if (id) {
      globalEventsDispatch({ type: "update", updatedEvent: tempNewEvent });
    } else {
      globalEventsDispatch({ type: "create", newEvent: tempNewEvent });
    }
  };

  return (
    <div id="form-box">
      <form id="event-box">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={localTitle}
          onChange={(event) => setLocalTitle(event.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={localDescription}
          onChange={(event) => setLocalDescription(event.target.value)}
        />

        <label>Is Completed:</label>
        <input
          type="checkbox"
          name="isCompleted"
          value={localIsCompleted}
          checked={localIsCompleted}
          onChange={(event) => setLocalIsCompleted(!localIsCompleted)}
        />

        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={new Date(localDueDate).toISOString().split("T")[0]}
          onChange={(event) => {
            console.log(event.target.value);
            setLocalDueDate(event.target.value);
          }}
        />

        {/* Event- this will be handled by the reducer, not the human: */}
        {/* <label>Created At:</label>
        <input
          type="text"
          name="createdAtDate"
          value={localCreatedAtDate}
          onChange={setLocalCreatedAtDate}
        /> */}
      </form>
      <Button variant="primary" onClick={saveEventToGlobal}>
        Save Event
      </Button>
    </div>
  );
}