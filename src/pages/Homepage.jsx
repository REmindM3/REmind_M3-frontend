import EventForm from "../components/EventForm";
import EventParent from "../components/EventParent";
import { useEventData, useEventDispatch } from "../contexts/EventsContext";
import logo from "../img/header-logo.png";
import MyCarousel from "../components/home.jsx"; // import MyCarousel component
import { useEffect } from "react";
import { getEvents } from "../services/eventsServices";

export default function Homepage(props) {
  const globalEventsData = useEventData();
  const globalEventsDispatch = useEventDispatch();

  useEffect(() => {
    getEvents().then(data => globalEventsDispatch({ type: "setup", data: data }))
    fetch("http://localhost:3007/events")
  }, []);

  return (
    <div>
      {/* main heading image */}
      <img src={logo} id="main-logo" alt="Logo" />

      {/* Add MyCarousel component */}
      <MyCarousel />

      {/* Event Count Component */}
      <h3>Welcome, There Are {globalEventsData.length} Events Active!</h3>

      {/* Event Form Component */}
      <h3>Create A New Event:</h3>
      <EventForm />

      {/* List Of All Events Component */}
      <h2>List of all events:</h2>
      {globalEventsData.map((event) => {
        return (
          <div key={event._id}>
            {/* <EventDisplay id={event.id} /> */}
            <EventParent _id={event._id} />
          </div>
        );
      })}
    </div>
  );
}
