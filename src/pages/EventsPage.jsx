import EventForm from "../components/EventForm";
import EventParent from "../components/EventParent";
import { useEventData, useEventDispatch } from "../contexts/EventsContext";
import logo from "../img/header-logo.png";
import usr_icon from "../img/user-icon.png";
// import MyCarousel from "../components/home.jsx"; // import MyCarousel component
import { useEffect } from "react";
import { getEvents } from "../services/eventsServices";

export default function EventsPage(props) {
  const globalEventsData = useEventData();
  const globalEventsDispatch = useEventDispatch();

  useEffect(() => {
    getEvents().then((data) =>
      globalEventsDispatch({ type: "setup", data: data })
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div id="top-btn-container">
        <button
          id="left-triangle-button"
          type="button"
          className="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
        >
          left
        </button>
        <button
          id="event-toggle"
          type="button"
          className="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
        >
          b1
        </button>
        <button
          id="event-toggle"
          type="button"
          className="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
        >
          b2
        </button>
      </div>

      <div id="main-logo-container">
        <img src={logo} id="main-logo" alt="Logo" />
      </div>
      <div id="user-icon-container">
        <img src={usr_icon} id="user-icon" alt="user-icon" />
      </div>

      

      {/* Add MyCarousel component */}
      {/* <MyCarousel /> */}

      {/* Event Count Component */}
      <u>
        <h3>Welcome, There Are {globalEventsData.length} Events Active!</h3>
      </u>

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
