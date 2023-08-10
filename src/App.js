import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/events" element={<EventsPage />} />
        {/* Add additional routes here */}
      </Routes>
    </div>
  );
}

export default App;
