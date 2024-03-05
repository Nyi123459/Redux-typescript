import { combineReducers } from "redux";
import { productsReducer, selectedProductReducer } from "./productsReducer";

export type Rootstate = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  products: productsReducer,
  product: selectedProductReducer,
});

export default rootReducer;
