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
  const [isPrivate, setIsPrivate] = useState(null);
  const [localAlertDate, setLocalAlertDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [localCreatedAtDate, setLocalCreatedAtDate] = useState(Date.now());
  const [error, setError] = useState("");

  useEffect(() => {
    let tempEvent = globalEventsData.find((globalSpecificEvent) => {
      return globalSpecificEvent._id === _id;
    });

    if (tempEvent) {
      // We found a event!!!
      setLocalTitle(tempEvent.title);
      setLocalDescription(tempEvent.description);
      setIsPrivate(tempEvent.isPrivate);
      setLocalAlertDate(tempEvent.alertDate);
      setLocalCreatedAtDate(tempEvent.localCreatedAtDate);
    }
  }, [globalEventsData, _id]);

  const saveEventToGlobal = () => {
    if (isPrivate === null) {
      setError(" * Is This Is A Private Or Community Event");
      return;
    }

    let tempNewEvent = {
      username: "Jairo",
      title: localTitle,
      description: localDescription,
      isPrivate: isPrivate,
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
        <label>
          <h3>Title:</h3>
        </label>
        <input
          className="input-field"
          type="text"
          name="title"
          value={localTitle}
          onChange={(event) => setLocalTitle(event.target.value)}
        />

        <label>
          <h3>Description:</h3>
        </label>
        <input
          className="input-field"
          type="text"
          name="description"
          value={localDescription}
          onChange={(event) => setLocalDescription(event.target.value)}
        />

        <label id="status-heading">
          <h3>Event Status:</h3>
        </label>

        {error && <h5 id="status-alert">{error}</h5>}

        <div id="status-buttons">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => setIsPrivate(true)}
            style={{ backgroundColor: isPrivate === true ? "darkgreen" : "" }}
          >
            Private
          </button>
          <h4> ---- OR ---- </h4>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => setIsPrivate(false)}
            style={{ backgroundColor: isPrivate === false ? "darkgreen" : "" }}
          >
            Share
          </button>
        </div>

        <label>
          <h3>Alert Date:</h3>
        </label>
        <input
          id="date-view"
          type="date"
          name="alertDate"
          value={new Date(localAlertDate).toISOString().split("T")[0]}
          onChange={(event) => {
            console.log(event.target.value);
            setLocalAlertDate(event.target.value);
          }}
        />
      </form>

      <Button id="save-btn" variant="success" onClick={saveEventToGlobal}>
        Save Event
      </Button>
    </div>
  );
}
