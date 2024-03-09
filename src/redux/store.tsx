// store.js
import { createStore, applyMiddleware, compose } from "redux";
import { thunk, ThunkMiddleware } from "redux-thunk";
import rootReducer from "../redux/reducers";

declare global {
  interface Window {
    _REDUX_DEVTOOLS_EXTENSION_COMPOSE_?: typeof compose;
  }
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware))
);


export default store;
