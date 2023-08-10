import React, { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventParent from "../components/EventParent";
import { useEventData, useEventDispatch } from "../contexts/EventsContext";
import logo from "../img/header-logo.png";
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
  const ids = globalEventsData.map((event) => event._id);
  const hasDuplicates = new Set(ids).size !== ids.length;
  console.log("Has duplicate _id values:", hasDuplicates);

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
          
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          id="event-toggle"
          type="button"
          className="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
          onClick={() => navigate("/")}
        >
          Login
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

      <div
        id="profile-opt-bar"
        className="btn-group"
        role="group"
        aria-label="Basic example"
      >
        
        <button
          id="create-new-toggle"
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleCreateClick}
        >
          Create An Event
        </button>
      </div>

      {/* Add MyCarousel component */}
      {/* <MyCarousel /> */}

      {/* Event Count Component */}
      <u>
        <h3>There are {globalEventsData.length} Active Events!</h3>
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
              <EventParent _id={event._id} showStatus={false} />
            </div>
        );
      })}
    </div>
  );
}
