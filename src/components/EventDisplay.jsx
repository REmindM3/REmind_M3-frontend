import { useEffect, useState } from "react";
import { useEventData } from "../contexts/EventsContext";

export default function EventDisplay(props) {
  const { _id } = props;
  const [localEvent, setLocalEvent] = useState({});

  const globalEventsData = useEventData();

  useEffect(() => {
    // on start, find the event in globalEventsData
    // that has an ID matching props.id

    setLocalEvent(
      globalEventsData.find((globalSpecificEvent) => {
        return globalSpecificEvent._id === _id;
      })
    );

    // Alternative syntax:
    // setLocalEvent(globalEventsData.find(globalSpecificEvent => globalSpecificEvent.id === id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalEventsData, _id]);

  return (
    <div>
      {/*
                - ID (number)
                - title (string)
                - description (string)
                - isPrivate (boolean)
                - alert date (JS Date)
                - created at date (JS Date)
                */}
      <h4>{localEvent.title}</h4>
      <p>{localEvent.description}</p>
      {/* <h5>status:</h5> */}
      <h5>status:<p>{localEvent.isPrivate ? "PRIVATE" : "PUBLIC"}</p></h5>

      {/* makes a read-only checkbox */}
      <input
        type="checkbox"
        disabled="disabled" // <--- user cannot click the checkbox
        onChange={null}
        readOnly={true}
        checked={Boolean(localEvent.isPrivate)}
        value={localEvent.isPrivate}
      />
      <h5>Alert Date: {new Date(localEvent.dueDate).toLocaleDateString()}</h5>
      {/* <input type="date" readOnly value={event.dueDate} /> */}
      <h5>
        Created At: {new Date(localEvent.createdAtDate).toLocaleDateString()}
      </h5>
      {/* <input type="datetime-local" readOnly value={event.createdAtDate} /> */}
    </div>
  );
}
