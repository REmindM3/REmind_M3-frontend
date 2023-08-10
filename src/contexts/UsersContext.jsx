// import React, { createContext, useContext, useState } from 'react';

// const UsersContext = createContext();

// export const UsersProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const logIn = (userData) => {
//     // log in the user and update the user state
//     setUser(userData);
//   };

//   const logOut = () => {
//     // log out the user and reset the user state
//     setUser(null);
//   };

//   return (
//     <UsersContext.Provider value={{ user, logIn, logOut }}>
//       {children}
//     </UsersContext.Provider>
//   );
// };

// export const useUsers = () => useContext(UsersContext);