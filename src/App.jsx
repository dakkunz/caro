// libs
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
// providers
import { Provider } from "react-redux";
import AppProviders from "@/providers";
//reducers
import rootReducers from '@/reducers/rootReducers';
// components
import LoadingIndicator from "@/components/LoadingIndicator";
import Main from "@/Main";
// others

const saveToLocalStorage = (state) => {
  try {
    if (state.roomReducers.roomInfo) {
      localStorage.setItem("state", JSON.stringify(state));
    } else {
      localStorage.setItem("state", null);
    }
  } catch (err) {
    console.log("Error when call function saveToLocalStorage()", err);
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState || serializedState === "null") return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("Error when call function loadFromLocalStorage()", err);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

// Create store
const store = createStore(
  rootReducers,
  persistedState,
  applyMiddleware(thunkMiddleware)
);
store.subscribe(() => saveToLocalStorage(store.getState()));

const App = () => (
  <Provider store={store}>
    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<LoadingIndicator />}>
          <Main />
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  </Provider>
);
export default App;
