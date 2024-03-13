import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

describe("store", () => {
  it("should create a store with the combined reducers", () => {
    const store = configureStore({ reducer: rootReducer });
    expect(store.getState()).toEqual({});
  });
});
