import { authContext } from "@/contexts";
import { useContext } from "react";

const useAuth = () => useContext(authContext);

export default useAuth;
