import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { SOCKET_URL } from "@/config/URL";
import io from "socket.io-client";
import { updateOnlineUser } from "@/actions/onlineUsers";
import { SOCKET_TYPES } from "@/constants/socketTypes";
import { message, Modal } from "antd";
import { updateRoomList } from "@/actions/roomList";
import { joinRoomSuccess, receiveChat, setIsJoinGame } from "@/actions/room";
import { useHistory } from "react-router-dom";

// game actions
import {useEventClick} from "@/hooks/useEvent";
import {useEventTime} from "@/hooks/useEvent";
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
          .on("get-rooms", (list) => {
            dispatch(updateRoomList(list));
          })
          .on(SOCKET_TYPES.ROOM_CREATE_ROOM_SUCCESS, (roomInfo) => {
            dispatch(joinRoomSuccess(roomInfo));
            push("/room", { roomInfo });
          })
          .on(SOCKET_TYPES.JOIN_ROOM_SUCCESS, (roomInfo) => {
            dispatch(joinRoomSuccess(roomInfo));
            push("/room", { roomInfo });
          })
          .on("join-room-quick-success", (roomInfo) => {
            dispatch(joinRoomSuccess(roomInfo));
            push("/room", { roomInfo });
          })
          .on("room-list-update-room", (roomInfo) => {
            dispatch(
              updateRoomList(
                roomList.map((room) =>
                  room.id === roomInfo.id ? roomInfo : room
                )
              )
            );
          })
          .on("room-list-delete-room", (roomId) => {
            dispatch(
              updateRoomList(roomList.filter((room) => room.id === roomId))
            );
          })
          .on(SOCKET_TYPES.HAS_NEW_ROOM, (room) => {
            dispatch(updateRoomList([room, ...roomList]));
          })
          .on(SOCKET_TYPES.REMOVE_OLD_ROOM, (roomId) => {
            dispatch(
              updateRoomList(roomList.filter(({ id }) => id !== roomId))
            );
          })
          // invite
          .on("receive-invite-request", (roomInfo) => {
            Modal.confirm({
              title: roomInfo.host.nickname + " moiwf",
              onOk: () => {
                socketInstance.current.emit("reply-invite-request", {
                  isAccept: true,
                  roomInfo,
                });
              },
              onCancel: () => {
                socketInstance.current.emit("reply-invite-request", {
                  isAccept: false,
                  roomInfo,
                });
              },
            });
          })
          .on("accept-invite-request", (user) => {
            console.log("accept", user);
          })
          .on("decline-invite-request", (user) => {
            console.log("declinet", user);
            Modal.error(`${user.nickname} tu choi`);
          })
          // room
          .on("room-detail-update", (room) => {
            console.log(room);
            dispatch(joinRoomSuccess(room));
          })
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
          .on("start-game", () => {
			console.log("start-game");
			dispatch(setIsJoinGame(true));
			useEventTime.emit("set-time");
          })
          .on(SOCKET_TYPES.JOIN_ROOM_QUICK_SUCCESS, (roomInfo) => {
            console.log(roomInfo);
            dispatch(actionJoinRoom(roomInfo));
          })
          .on(SOCKET_TYPES.CHAT, (data) => {
			dispatch(actionChat(data));
            dispatch(actionChatRoom(data));
          })
          .on(SOCKET_TYPES.MOVE, (data) => {
			useEventClick.emit("add-new-move", data);
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
