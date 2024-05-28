import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./loader";
import useUserContext from "../context/userContext";

export default function ProtectedRoute({
  component: Component,
  allowedRole,
  rest,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { currentRole } = useUserContext();

  const validate = () => {
    setPageLoaded(false);
    setTimeout(() => {
      if (allowedRole == currentRole) {
        setIsAuthenticated(true);
        return;
      }
      setIsAuthenticated(false);
      setPageLoaded(true);
    }, 500);
  };

  useEffect(() => {
    validate();
  });

  if (isAuthenticated) {
    return <Component {...rest} />; // passing already passed props if any
  } else if (pageLoaded) {
    return <Navigate to={"/"} />;
  }
  return <Loader />;
}
