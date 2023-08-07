import { Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";

// start rendering stuff from this file
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/events" element={<h1>""</h1>} />
        <Route path="/events/:eventID" element={<h1>""</h1>} />
        <Route path="/events/:eventID/edit" element={<h1>""</h1>} />
        <Route path="/events/searchByWord/:word" element={<h1>""</h1>} />
        <Route path="/events/sort/alertDate" element={<h1>""</h1>} />
        <Route path="/events/sort/createdDate" element={<h1>""</h1>} />
        {/* <Route path="/events/filter/overdue" element={<h1>""</h1>} /> */}
        {/* <Route path="/events/filter/done" element={<h1>""</h1>} /> */}
      </Routes>
    </div>
  );
}

export default App;
