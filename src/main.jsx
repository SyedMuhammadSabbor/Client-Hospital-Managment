import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorContextProvider from "./context/errorContext/context.jsx";
import UserContextProvider from "./context/userContext/context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ErrorContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
