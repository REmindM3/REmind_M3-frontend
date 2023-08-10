import React, { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventParent from "../components/EventParent";
import { useEventData, useEventDispatch } from "../contexts/EventsContext";
import logo from "../img/header-logo.png";
import usr_icon from "../img/user-icon.png";
// import MyCarousel from "../components/home.jsx"; // import MyCarousel component
import { getEvents } from "../services/eventsServices";
import { useNavigate } from "react-router-dom";

export default function ProfilePage(props) {
  const globalEventsData = useEventData();
  const globalEventsDispatch = useEventDispatch();
  const [showEventForm, setShowEventForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents().then((data) =>
      globalEventsDispatch({ type: "setup", data: data })
    );
    // eslint-disable-next-line
  }, []);

  // Check for duplicate _id values
  const ids = globalEventsData.map(event => event._id);
  const hasDuplicates = new Set(ids).size !== ids.length;
  console.log('Has duplicate _id values:', hasDuplicates);

  const handleCreateClick = () => {
    setShowEventForm(!showEventForm);
  };

  return (
    <div>
      <div id="top-btn-container">
        <button
          id="left-triangle-button"
          type="button"
          className="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
          onClick={() => navigate('/events')}
        >
          Events
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

      <div
        id="profile-opt-bar"
        className="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <button id="" type="button" className="btn btn-secondary btn-lg">
          Mark All
        </button>

        <button
          id="create-new-toggle"
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleCreateClick}
        >
          Create
        </button>
      </div>

      {/* Add MyCarousel component */}
      {/* <MyCarousel /> */}

      {/* Event Count Component */}
      <u>
        <h3>You Have {globalEventsData.length} Events Active!</h3>
      </u>

      {/* Event Form Component */} 
      {showEventForm ? (
        <>
          <h3>Create A New Event:</h3>
          <EventForm />
        </>
      ) : null}

      {/* List Of All Events Component */}
      <h2>List of all events:</h2>
      {globalEventsData.map((event) => {
        return (
          <div key={event._id}>
            <EventParent _id={event._id} />
          </div>
        );
      })}
    </div>
  );
}
