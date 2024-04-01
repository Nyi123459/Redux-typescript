import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Assuming your reducers are in a file named 'reducers.js'

const store = configureStore({
  reducer: rootReducer,
});

export default store;
