
import EventForm from "../components/EventForm";
import EventParent from "../components/EventParent";
import { useEventData } from "../contexts/EventsContext";

export default function Homepage(props) {
  const globalEventsData = useEventData();

  return (
    <div>
      <h1 id="main-logo" alt= "main-logo">REmind_M3</h1>

      {/* Event Count Component */}
      <h3>We have {globalEventsData.length} events in storage!</h3>

      {/* Event Form Component */}
      <h3>Create A New Event:</h3>
      <EventForm />

      {/* List Of All Events Component */}
      <h2>List of all events:</h2>
      {globalEventsData.map((event) => {
        return (
          <div key={event.id}>
            {/* <EventDisplay id={event.id} /> */}
            <EventParent id={event.id} />
          </div>
        );
      })}
    </div>
  );
}
