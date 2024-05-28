import { useContext } from "react";
import { UserContext } from "./context";

const useUserContext = () => useContext(UserContext);

export default useUserContext;
