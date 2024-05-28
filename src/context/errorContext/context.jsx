import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

// error message = {
//     message: "",
//     variant: "danger" || "success"
// }

const ErrorContextProvider = ({ children }) => {
  const [errorList, setErrorsList] = useState([]);

  const addError = (errorMessage) => {
    setErrorsList((prev) => [
      ...prev,
      { message: errorMessage, variant: "danger" },
    ]);
  };

  const addSuccess = (errorMessage) => {
    setErrorsList((prev) => [
      ...prev,
      { message: errorMessage, variant: "success" },
    ]);
  };

  return (
    <ErrorContext.Provider value={{ errorList, setErrorsList, addError, addSuccess }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
