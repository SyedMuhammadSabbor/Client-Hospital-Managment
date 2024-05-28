import { useContext } from "react";
import { ErrorContext } from "./context";

const useErrorContext = () => useContext(ErrorContext);

export default useErrorContext;
