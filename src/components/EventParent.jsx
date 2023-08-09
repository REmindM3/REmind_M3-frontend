import { useState, useContext } from 'react';
import EventForm from './EventForm';
import EventDisplay from './EventDisplay';
import { EventDispatchContext } from '../contexts/EventsContext';

export default function EventParent(props) {
  const [editMode, setEditMode] = useState(false);
  const globalEventsDispatch = useContext(EventDispatchContext);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDeleteClick = async () => {
    console.log('Deleting event with _id:', props._id);
  
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Delete the event
      const response = await fetch(`http://localhost:3007/events/${props._id}`, {
        method: 'delete',
      });
      const data = await response.json();
  
      console.log(data);
  
      // Update global events data
      globalEventsDispatch({ type: 'delete', id: props._id });
  
      // Refresh the page
      window.location.reload();
    }
  }
  

  return (
    <div className="card">
      <div className="card-header">Event</div>
      <div className="card-body">
        {editMode ? (
          <EventForm _id={props._id} />
        ) : (
          <EventDisplay _id={props._id} />
        )}
        <button className="btn btn-primary" onClick={toggleEditMode}>
          {editMode ? 'Cancel' : 'Edit Event'}
        </button>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete Event
        </button>
      </div>
    </div>
  );
}
