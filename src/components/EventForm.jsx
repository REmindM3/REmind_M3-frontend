import { useEffect, useState } from "react";
import { useEventData, useEventDispatch } from "../contexts/EventsContext";
import Button from "react-bootstrap/Button";
import { createEvent } from "../services/eventsServices";

export default function EventForm(props) {
  // If this is null/no prop provided, we are creating a event
  // If id has value, we are editing a event.
  const { _id } = props;

  // this is to read the global events data:
  const globalEventsData = useEventData();
  // The dispatch is our reducer, can edit global events data:
  const globalEventsDispatch = useEventDispatch();

  //   const [localId, setLocalId] = useState("");
  // const [localCreator, setLocalCreator] = useState("");
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");
  const [localIsPrivate, setLocalIsPrivate] = useState("");
  const [localAlertDate, setLocalAlertDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [localCreatedAtDate, setLocalCreatedAtDate] = useState(Date.now());

  useEffect(() => {
    let tempEvent = globalEventsData.find((globalSpecificEvent) => {
      return globalSpecificEvent._id === _id;
    });

    if (tempEvent) {
      // We found a event!!!
      setLocalTitle(tempEvent.title);
      setLocalDescription(tempEvent.description);
      setLocalIsPrivate(tempEvent.isPrivate);
      setLocalAlertDate(tempEvent.alertDate);
      setLocalCreatedAtDate(tempEvent.localCreatedAtDate);
    }
  }, [globalEventsData, _id]);

  const saveEventToGlobal = () => {
    let tempNewEvent = {
      username: "Jairo",
      title: localTitle,
      description: localDescription,
      isPrivate: localIsPrivate,
      alertDate: localAlertDate,
      createdAtDate: localCreatedAtDate,
    };

    if (_id) {
      globalEventsDispatch({ type: "update", updatedEvent: tempNewEvent });
    } else {
      createEvent(tempNewEvent).then((data) => console.log(data));
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

        <label>Private Event:</label>
        <input
          type="checkbox"
          name="isPrivate"
          value={localIsPrivate}
          checked={localIsPrivate}
          onChange={(event) => setLocalIsPrivate(!localIsPrivate)}
        />

        <label>Alert Date:</label>
        <input
          type="date"
          name="alertDate"
          value={new Date(localAlertDate).toISOString().split("T")[0]}
          onChange={(event) => {
            console.log(event.target.value);
            setLocalAlertDate(event.target.value);
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
