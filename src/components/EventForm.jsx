import { useEffect, useState } from "react";
import { useEventData, useEventDispatch } from "../contexts/EventsContext";
import Button from "react-bootstrap/Button";
import { createEvent } from "../services/eventsServices";
import { Toast } from "react-bootstrap"; // import Toast component

export default function EventForm(props) {
  const { _id } = props;

  // this is to read the global events data:
  const globalEventsData = useEventData();
  // The dispatch is our reducer, can edit global events data:
  const globalEventsDispatch = useEventDispatch();

 
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(null);
  const [localAlertDate, setLocalAlertDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [localCreatedAtDate, setLocalCreatedAtDate] = useState(Date.now());
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false); // add state for toast visibility

  useEffect(() => {
    let tempEvent = globalEventsData.find((globalSpecificEvent) => {
      return globalSpecificEvent._id === _id;
    });

    if (tempEvent) {
      setLocalTitle(tempEvent.title);
      setLocalDescription(tempEvent.description);
      setIsPrivate(tempEvent.isPrivate);
      setLocalAlertDate(tempEvent.alertDate);
      setLocalCreatedAtDate(tempEvent.localCreatedAtDate);
    }
  }, [globalEventsData, _id]);

  const saveEventToGlobal = () => {
    if (isPrivate === null) {
      setError(" * Is This Is A Private Or Community Event? * ");
      return;
    }

    // Creating a temporary new event object with properties from state variables and hardcoded username
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
    setShowToast(true); // show the toast when event is saved
  };

  // Returning JSX to display a form for creating or editing an event
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
            id="pvt-btn"
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => setIsPrivate(true)}
            style={{ backgroundColor: isPrivate === true ? "darkgreen" : "" }}
          >
            Private
          </button>
          <h4> ---- OR ---- </h4>
          <button
            id="pblc-btn"
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => setIsPrivate(false)}
            style={{ backgroundColor: isPrivate === false ? "darkgreen" : "" }}
          >
            Shared
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

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Your event has been created.</Toast.Body>
      </Toast>
    </div>
  );
}
