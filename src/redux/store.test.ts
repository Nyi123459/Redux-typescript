import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

jest.mock("@reduxjs/toolkit");

test("uses the rootReducer", () => {
  const configureStoreSpy = jest.spyOn(
    require("@reduxjs/toolkit"),
    "configureStore"
  );
  configureStore({ reducer: rootReducer });
  expect(configureStoreSpy).toHaveBeenCalledWith({ reducer: rootReducer });
  configureStoreSpy.mockRestore();
});
