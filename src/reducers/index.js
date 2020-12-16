import { combineReducers } from "redux";
import gameReducers from "./gameReducers";
import roomReducers from "./roomReducers";

export default combineReducers({
	gameReducers,
	roomReducers,
});
