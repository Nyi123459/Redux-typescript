// productsReducer.ts
import { ActionTypes } from "../../constants/action-types";

import { Product } from "../actions/productActions";

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: any; // Replace with the actual type of your error handling
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

type ProductsAction = {
  type: string;
  payload: Product[] | any;
};

export const productsReducer = (
  state: ProductsState = initialState,
  { type, payload }: ProductsAction
): ProductsState => {
  switch (type) {
    case ActionTypes.FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: payload as Product[] };
    case ActionTypes.FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export interface SelectedProductState {
  loading: boolean;
  product: Product | null;
  error: any; // Replace with the actual type of your error handling
}

export const initialSelectedProductState: SelectedProductState = {
  product: null,
  loading: false,
  error: null,
};

type SelectedProductAction = {
  type: string;
  payload: Product | any;
};

export const selectedProductReducer = (
  state: SelectedProductState = initialSelectedProductState,
  { type, payload }: SelectedProductAction
): SelectedProductState => {
  switch (type) {
    case ActionTypes.FETCH_SELECTED_PRODUCT:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: payload as Product };
    case ActionTypes.FETCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
