import { onlineContext } from "@/contexts";
import { useContext } from "react";

const useOnlineListener = () => useContext(onlineContext);

export default useOnlineListener;
