import { useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./loader";

export default function ProtectedRoute({ component: Component, rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false);

  setTimeout(() => {
    setIsAuthenticated(false);
  }, 1000);

  
  setTimeout(() => {
    setPageLoaded(true);
  }, 1000);

  if (isAuthenticated) {
    return <Component {...rest} />; // passing already passed props if any
  } else if (pageLoaded) {
    return <Navigate to={"/"} />;
  }
  return <Loader />;
}
