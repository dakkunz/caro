import { useEffect, useState } from "react";
import socket from "@/config/socket";

const useProvideOnline = () => {
  const [list, setList] = useState([]);
  const emitOffline = (userId) => {
    socket.emit("user-offline", userId);
  };
  const emitOnline = (user) => {
    socket.emit("user-online", user);
  };

  useEffect(() => {
    socket.on("user-online", (user) => {
	  let l = [];
	  if(list) l = list.filter((u) => (u.id || u.userId) !== user.userId);
      setList(l.concat(user));
    });
    socket.on("user-offline", (userId) => {
      setList(list.filter((user) => (user.id || user.userId) !== userId));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return {
    list,
    setList,
    emitOffline,
    emitOnline,
  };
};

export default useProvideOnline;
