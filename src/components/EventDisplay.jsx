// Importing the useEffect and useState hooks from the react library
import { useEffect, useState } from "react";
// Importing the useEventData hook from the EventsContext file
import { useEventData } from "../contexts/EventsContext";

// Creating a functional component called EventDisplay that takes in props as an argument
export default function EventDisplay(props) {
  // Destructuring the _id property from the props object
  const { _id } = props;
  // Creating a state variable called localEvent and initializing it to an empty object
  const [localEvent, setLocalEvent] = useState({});

  // Calling the useEventData hook to get the global events data
  const globalEventsData = useEventData();

  // Using the useEffect hook to update the localEvent state variable when either globalEventsData or _id changes
  useEffect(() => {
    // Updating the localEvent state variable by finding the specific event in globalEventsData that has the same _id as the _id prop
    setLocalEvent(
      globalEventsData.find((globalSpecificEvent) => {
        return globalSpecificEvent._id === _id;
      })
    );

    // Disabling the exhaustive-deps warning for this useEffect hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalEventsData, _id]);

  // Returning JSX to display information about the local event
  return (
    <>
      <h5 className="card-title">{localEvent.title}</h5>
      <p className="card-text">{localEvent.description}</p>
      {props.showStatus && (
        <h6>Status: {localEvent.isPrivate ? "PRIVATE" : "PUBLIC"}</h6>
      )}
      <h6>Alert Date: {new Date(localEvent.alertDate).toLocaleDateString()}</h6>
      <h6>Creator: {localEvent.username ? localEvent.username : "Anonymous"}</h6>
      <h6>
        Created At: {new Date(localEvent.createdAtDate).toLocaleDateString()}
      </h6>
    </>
  );
}
