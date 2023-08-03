import EventForm from "../components/EventForm";
import EventParent from "../components/EventParent";
import { useEventData } from "../contexts/EventsContext";
import logo from "../img/header-logo.png";
import MyCarousel from "../components/home.jsx"; // import MyCarousel component

export default function Homepage(props) {
  const globalEventsData = useEventData();

  return (
    <div>
      {/* main heading image */}
      <img src={logo} id="main-logo" alt="Logo" />

      {/* Add MyCarousel component */}
      <MyCarousel />

      {/* Event Count Component */}
      <h3>Welcome, there are {globalEventsData.length} events active!</h3>

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
