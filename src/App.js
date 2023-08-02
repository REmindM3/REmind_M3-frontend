import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

// start rendering stuff from this file
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/events" element={<h1>ToDo</h1>} />
        <Route path="/events/:eventID" element={<h1>ToDo</h1>} />
        <Route path="/events/:eventID/edit" element={<h1>ToDo</h1>} />
        <Route path="/events/searchByWord/:word" element={<h1>ToDo</h1>} />
        <Route path="/events/sort/dueDate" element={<h1>ToDo</h1>} />
        <Route path="/events/sort/createdDate" element={<h1>ToDo</h1>} />
        <Route path="/events/filter/overdue" element={<h1>ToDo</h1>} />
        <Route path="/events/filter/done" element={<h1>ToDo</h1>} />
      </Routes>
    </div>
  );
}

export default App;
