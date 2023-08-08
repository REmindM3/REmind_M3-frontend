import { useEffect, useState } from "react";
import { useEventData } from "../contexts/EventsContext";

export default function EventDisplay(props) {
  const { _id } = props;
  const [localEvent, setLocalEvent] = useState({});

  const globalEventsData = useEventData();

  useEffect(() => {
    setLocalEvent(
      globalEventsData.find((globalSpecificEvent) => {
        return globalSpecificEvent._id === _id;
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalEventsData, _id]);

  return (
    <>
      <h5 className="card-title">{localEvent.title}</h5>
      <p className="card-text">{localEvent.description}</p>
      <h6>Status: {localEvent.isPrivate ? "PRIVATE" : "PUBLIC"}</h6>
      <h6>Alert Date: {new Date(localEvent.alertDate).toLocaleDateString()}</h6>
      <h6>
        Created At: {new Date(localEvent.createdAtDate).toLocaleDateString()}
      </h6>
    </>
  );
}
