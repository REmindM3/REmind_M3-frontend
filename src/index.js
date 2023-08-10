import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import EventsProvider from "./contexts/EventsContext";
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <EventsProvider>
        <App />
      </EventsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
