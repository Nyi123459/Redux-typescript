import { ActionTypes } from "../../constants/action-types";
import { Dispatch } from "redux";

export interface Product {
  // Define the structure of your product
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_PRODUCTS_REQUEST });

      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: data.products as Product[],
      });

      return data.products as Product[];
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });

      throw error; // Throw the error to be caught in the component
    }
  };
};

export const fetchProduct = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_SELECTED_PRODUCT });

      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: data as Product,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_FAILURE,
        payload: error.message,
      });
    }
  };
};
