import { combineReducers, Reducer, Action } from "redux";
import { productsReducer, selectedProductReducer } from "./productsReducer";
import { ActionTypes } from "../../constants/action-types";
import { Product } from "../actions/productActions";

// Define a custom action type that extends Action<string>
interface CustomAction extends Action {
  payload?: any; // Adjust this according to your payload structure
}

type RootAction =
  | { type: ActionTypes.FETCH_PRODUCTS_REQUEST }
  | { type: ActionTypes.FETCH_PRODUCTS_SUCCESS; payload: Product[] }
  | { type: ActionTypes.FETCH_PRODUCTS_FAILURE; payload: any }
  | { type: ActionTypes.FETCH_SELECTED_PRODUCT }
  | { type: ActionTypes.FETCH_PRODUCT_SUCCESS; payload: Product }
  | { type: ActionTypes.FETCH_PRODUCT_FAILURE; payload: any };

// Define the root state type
interface RootState {
  products: ReturnType<typeof productsReducer>;
  product: ReturnType<typeof selectedProductReducer>;
  // Add other state slices if needed
}

const rootReducer: Reducer<RootState, RootAction> = combineReducers({
  products: productsReducer,
  product: selectedProductReducer,
  // Add other reducers if needed
});

export default rootReducer;
