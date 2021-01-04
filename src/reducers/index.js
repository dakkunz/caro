import { combineReducers } from "redux";
import game from "./game";
import roomReducers from "./roomReducers";
import onlineUsers from "./onlineUsers";
import roomList from "./roomList";

export default combineReducers({
	game,
	roomReducers,
	onlineUsers,
	roomList,
});
