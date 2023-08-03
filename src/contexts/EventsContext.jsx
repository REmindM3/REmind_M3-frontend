import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialEventsData = [
  // {
  //   id: 1,
  //   title: "Bobs birthday",
  //   description: "Lets party, people!",
  //   isPrivate: false,
  //   alertDate: new Date().setDate(new Date().getDate() + 1), // Current date plus one day (in future.)
  //   createdAtDate: Date.now(),
  // },
];

const eventsReducer = (previousState, instructions) => {
  let stateEditable = [...previousState];

  switch (instructions.type) {
    case "setup":
      console.log("Apply persistent data to state now.");

      // instructions.data is provided when the dispatch function is called
      let localStorageData = instructions.data;
      stateEditable = localStorageData;

      // Whatever is returned is now the newest version of state
      return stateEditable;

    case "create":
      console.log("Create event and add to state");

      let newEvent = instructions.newEvent;
      stateEditable.push(newEvent);

      return stateEditable;

    case "update":
      console.log("Update specific event and overwrite it in state");

      // 1. Find the existing event
      let targetEventIndex = stateEditable.findIndex((globalSpecificEvent) => {
        //console.log("Some event data");

        return globalSpecificEvent.id === instructions.updatedEvent.id;
      });

      // 2. Overwrite existing event
      stateEditable[targetEventIndex] = instructions.updatedEvent;

      // 3. Return updated state array of events
      return stateEditable;
    case "delete":
      console.log("ToDo: Delete event from state");
      break;
    case "sortByAlertDate":
      console.log("Sorted state data by due date");
      break;
    case "sortByCreatedDate":
      console.log("Sorted state data by created date");
      break;
    case "sortById":
      console.log("Sort by ID, default ordering.");
      break;
    default:
      console.log(
        "invalid instruction type given, it was: " + instructions.type
      );
      return previousState;
  }
};

export const EventDataContext = createContext(null);
export const EventDispatchContext = createContext(null);

export function useEventData() {
  return useContext(EventDataContext);
}

export function useEventDispatch() {
  return useContext(EventDispatchContext);
}

export default function EventsProvider(props) {
  const [eventsData, eventsDispatch] = useReducer(eventsReducer, initialEventsData);

  //key is 'events' in the application / local storage in devtools

  const [persistentData, setPersistentData] = useLocalStorage(
    "events",
    initialEventsData
  );

  useEffect(() => {
    // On app start, overwrite eventsData with persistentData
    eventsDispatch({ type: "setup", data: persistentData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dev: confirm that our local storage is updating
  useEffect(() => {
    console.log("Local Storage: " + persistentData);
  }, [persistentData]);

  // Autosave any changes to events from reducer state into local storage
  useEffect(() => {
    setPersistentData(eventsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData]);

  return (
    <EventDataContext.Provider value={eventsData}>
      <EventDispatchContext.Provider value={eventsDispatch}>
        {props.children}
      </EventDispatchContext.Provider>
    </EventDataContext.Provider>
  );
}
