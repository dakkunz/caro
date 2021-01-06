import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { SOCKET_URL } from "@/config/URL";
import io from "socket.io-client";
import { updateOnlineUser } from "@/actions/onlineUsers";
import { SOCKET_TYPES } from "@/constants/socketTypes";
import { message } from "antd";
import { updateRoomList } from "@/actions/roomList";
import { joinRoomSuccess, receiveChat } from "@/actions/room";
import { useHistory } from "react-router-dom";

// game actions
import useEvent from "@/hooks/useEvent";
import actionChat from "@/actions/actionChat";
import actionChatRoom from "@/actions/actionChatRoom";
import actionJoinRoom from "@/actions/actionJoinRoom";

const useProvideSocket = () => {
  const socketInstance = useRef();
  const { isAuthenticated, getAccessTokenSilently, user, logout } = useAuth0();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.onlineUsers);
  const { list: roomList } = useSelector((state) => state.roomList);
  const { push } = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        socketInstance.current = io(SOCKET_URL, {
          query: { token },
        })
          // online user
          .on(SOCKET_TYPES.CONNECT, () => {
            socketInstance.current.emit(SOCKET_TYPES.USER_ONLINE, user);
          })
          .on(SOCKET_TYPES.USER_OFFLINE, (socketId) => {
            dispatch(
              updateOnlineUser(
                list.filter((user) => user.socketId !== socketId)
              )
            );
          })
          .on(SOCKET_TYPES.USER_ONLINE, (user) => {
            dispatch(updateOnlineUser([...list, user]));
          })
          .on(SOCKET_TYPES.GET_ONLINE, (list) => {
            dispatch(updateOnlineUser(list));
          })
          .on(SOCKET_TYPES.FORCE_LOGOUT, (mes) => {
            message.error(mes);
            setTimeout(() => {
              logout();
              socketInstance.current.disconnect();
            }, 2000);
          })
          // room list
          .on(SOCKET_TYPES.JOIN_ROOM_SUCCESS, (roomInfo) => {
            dispatch(joinRoomSuccess(roomInfo));
            push("/room", { roomInfo });
          })
          .on(SOCKET_TYPES.HAS_NEW_ROOM, (room) => {
            dispatch(updateRoomList([room, ...roomList]));
          })
          .on(SOCKET_TYPES.REMOVE_OLD_ROOM, (roomId) => {
            dispatch(
              updateRoomList(roomList.filter(({ id }) => id !== roomId))
            );
          })
          // room
          .on(
            SOCKET_TYPES.ROOM__RECEIVE_CHAT,
            ({ fromUser, message, time }) => {
              dispatch(receiveChat({ fromUser, message, time }));
            }
          )
          .on(SOCKET_TYPES.ROOM__JOIN_GAME_SUCCESS, (gameInfo) => {
            push("/room", { gameInfo });
          })
          // game
          .on(SOCKET_TYPES.JOIN_ROOM_QUICK_SUCCESS, (roomInfo) => {
            console.log(roomInfo);
            dispatch(actionJoinRoom(roomInfo));
          })
          .on(SOCKET_TYPES.CHAT, (data) => {
            dispatch(actionChat(data));
            dispatch(actionChatRoom(data));
          })
          .on(SOCKET_TYPES.MOVE, (data) => {
            console.log("new move");
            useEvent.emit("add-new-move", data);
          })
          .on(SOCKET_TYPES.DISCONNECT_ROOM, (data) => {
            if (data.id) dispatch(actionJoinRoom(data));
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return socketInstance.current;
};

export default useProvideSocket;
