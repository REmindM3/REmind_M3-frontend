// import { Routes, Route } from "react-router-dom";
// import ProfilePage from "./pages/ProfilePage";

// // start rendering stuff from this file
// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<ProfilePage />} />
//         <Route path="/events" element={<h1>""</h1>} />
//         <Route path="/events/:eventID" element={<h1>""</h1>} />
//         <Route path="/events/:eventID/edit" element={<h1>""</h1>} />
//         <Route path="/events/searchByWord/:word" element={<h1>""</h1>} />
//         <Route path="/events/sort/alertDate" element={<h1>""</h1>} />
//         <Route path="/events/sort/createdDate" element={<h1>""</h1>} />
//         {/* <Route path="/events/filter/overdue" element={<h1>""</h1>} /> */}
//         {/* <Route path="/events/filter/done" element={<h1>""</h1>} /> */}
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/events" element={<ProfilePage />} />
        {/* Add additional routes here */}
      </Routes>
    </div>
  );
}

export default App;
