import { combineReducers } from "redux";
import game from "./game";
import roomReducers from "./roomReducers";
import onlineUsers from "./onlineUsers";
import roomList from "./roomList";
import room from "./room";

export default combineReducers({
	game,
	room,
	roomReducers,
	onlineUsers,
	roomList,
});
