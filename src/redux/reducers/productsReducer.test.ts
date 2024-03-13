import { productsReducer, initialState } from "./productsReducer";
import { ActionTypes } from "../../constants/action-types";

describe("productsReducer", () => {
  it("should return initial state", () => {
    const action = {} as any;
    const expectedState = initialState;
    expect(productsReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle FETCH_PRODUCTS_REQUEST", () => {
    const action = { type: ActionTypes.FETCH_PRODUCTS_REQUEST, payload: [] };
    const expectedState = { ...initialState, loading: true, error: null };
    expect(productsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_PRODUCTS_SUCCESS", () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    const action = {
      type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: mockProducts,
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      products: mockProducts,
    };
    expect(productsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_PRODUCTS_FAILURE", () => {
    const mockError = new Error("Failed to fetch products");
    const action = {
      type: ActionTypes.FETCH_PRODUCTS_FAILURE,
      payload: mockError,
    };
    const expectedState = { ...initialState, loading: false, error: mockError };
    expect(productsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle unknown actions", () => {
    const unknownAction = { type: "UNKNOWN_ACTION", payload: [] };
    expect(productsReducer(initialState, unknownAction)).toEqual(initialState);
  });
});

import {
  selectedProductReducer,
  initialSelectedProductState,
} from "./productsReducer";

describe("selectedProductReducer", () => {
  it("should return initial state", () => {
    const action = {} as any; // Any action type
    const expectedState = initialSelectedProductState;
    expect(selectedProductReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle FETCH_SELECTED_PRODUCT", () => {
    const action = { type: ActionTypes.FETCH_SELECTED_PRODUCT, payload: [] };
    const expectedState = {
      ...initialSelectedProductState,
      loading: true,
      error: null,
    };
    expect(selectedProductReducer(initialSelectedProductState, action)).toEqual(
      expectedState
    );
  });

  it("should handle FETCH_PRODUCT_SUCCESS", () => {
    const mockProduct = { id: 3, name: "Selected Product" };
    const action = {
      type: ActionTypes.FETCH_PRODUCT_SUCCESS,
      payload: mockProduct,
    };
    const expectedState = {
      ...initialSelectedProductState,
      loading: false,
      product: mockProduct,
    };
    expect(selectedProductReducer(initialSelectedProductState, action)).toEqual(
      expectedState
    );
  });

  it("should handle FETCH_PRODUCT_FAILURE", () => {
    const mockError = new Error("Failed to fetch selected product");
    const action = {
      type: ActionTypes.FETCH_PRODUCT_FAILURE,
      payload: mockError,
    };
    const expectedState = {
      ...initialSelectedProductState,
      loading: false,
      error: mockError,
    };
    expect(selectedProductReducer(initialSelectedProductState, action)).toEqual(
      expectedState
    );
  });

  it("should handle unknown actions", () => {
    const unknownAction = { type: "UNKNOWN_ACTION", payload: [] };
    expect(
      selectedProductReducer(initialSelectedProductState, unknownAction)
    ).toEqual(initialSelectedProductState);
  });
});
