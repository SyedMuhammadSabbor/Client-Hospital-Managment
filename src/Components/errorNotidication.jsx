import { useEffect } from "react";
import useErrorContext from "../context/errorContext";

export default function ErrorNotifications() {
  const errorContext = useErrorContext();

  return (
    <div className="fixed w-full flex justify-center">
      <div className="w-[60%] flex flex-col">
        {errorContext.errorList.map((error, index) => (
          <Notification key={index} error={error} />
        ))}
      </div>
    </div>
  );
}

function Notification({ error }) {
  const errorContext = useErrorContext();

  const removeError = () => {
    errorContext.setErrorsList((prev) =>
      prev.filter((errorItem) => errorItem != error)
    );
  };

  useEffect(() => {
    setTimeout(() => {
      removeError();
    }, 5000);
  }, []);
  return (
    <div
      className={`${
        error.variant == "danger" ? "bg-red-500" : "bg-green-500"
      } text-white p-1 my-1 flex w-full justify-between`}
    >
      <p>{error.message}</p>

      <button onClick={removeError}>X</button>
    </div>
  );
}
