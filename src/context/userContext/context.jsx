import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState("");

  const validateRoleDataRequest = async () => {
    // validate api call here
    setCurrentRole("admin");
  };

  useEffect(() => {
    // get token from cookies if any, validate it and set the role
    // there os validation api on backend
    validateRoleDataRequest();
  }, []);

  return (
    <UserContext.Provider value={{ currentRole }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
