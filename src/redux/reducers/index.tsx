import { combineReducers, Reducer } from "redux";
import { productsReducer, selectedProductReducer } from "./productsReducer";
import { ActionTypes } from "../../constants/action-types";
import { Product } from "../actions/productActions";
import { initialSelectedProductState, initialState } from "./productsReducer";

interface RootState {
  products: typeof initialState;
  product: typeof initialSelectedProductState;
  // Add other state slices if needed
}

type RootAction =
  | { type: ActionTypes.FETCH_PRODUCTS_REQUEST }
  | { type: ActionTypes.FETCH_PRODUCTS_SUCCESS; payload: Product[] }
  | { type: ActionTypes.FETCH_PRODUCTS_FAILURE; payload: any }
  | { type: ActionTypes.FETCH_SELECTED_PRODUCT }
  | { type: ActionTypes.FETCH_PRODUCT_SUCCESS; payload: Product }
  | { type: ActionTypes.FETCH_PRODUCT_FAILURE; payload: any };

// Define the root state type

const rootReducer: Reducer<RootState, RootAction> = combineReducers({
  products: productsReducer,
  product: selectedProductReducer,
  // Add other reducers if needed
});

export default rootReducer;
