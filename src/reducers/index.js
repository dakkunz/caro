import { combineReducers } from "redux";
import game from "./game";
import gameReplay from "./gameReplay";
import onlineUsers from "./onlineUsers";
import profile from "./profile";
import ranking from "./ranking";
import room from "./room";
import roomList from "./roomList";
import roomReducers from "./roomReducers";

export default combineReducers({
	game,
	room,
	roomReducers,
	onlineUsers,
	roomList,
	profile,
	ranking,
	gameReplay,
});
