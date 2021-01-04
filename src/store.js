import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

// const saveToLocalStorage = (state) => {
// 	try {
// 		if (state.roomReducers.roomInfo) {
// 			localStorage.setItem("state", JSON.stringify(state));
// 		} else {
// 			localStorage.setItem("state", null);
// 		}
// 	} catch (err) {
// 		console.log("Error when call function saveToLocalStorage()", err);
// 	}
// };

// const loadFromLocalStorage = () => {
// 	try {
// 		const serializedState = localStorage.getItem("state");
// 		if (!serializedState || serializedState === "null") return undefined;
// 		return JSON.parse(serializedState);
// 	} catch (err) {
// 		console.log("Error when call function loadFromLocalStorage()", err);
// 		return undefined;
// 	}
// };

// const persistedState = loadFromLocalStorage();

const store = createStore(
	rootReducer,
	// persistedState,
	composeWithDevTools(applyMiddleware(...middleware))
);
// store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
