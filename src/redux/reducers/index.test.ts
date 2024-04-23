import rootReducer from "./index";
import { Rootstate } from "./index";
import { productsReducer, selectedProductReducer } from "./productsReducer";
import { initialState as productsInitialState } from "./productsReducer";
import { initialSelectedProductState } from "./productsReducer";

describe("Root Reducer", () => {
  it("should return the initial state", () => {
    const initialState: Rootstate = {
      products: productsInitialState,
      product: initialSelectedProductState,
    };

    const result = rootReducer(undefined, {} as any);

    expect(result).toEqual(initialState);
  });
});

describe("Products Reducer", () => {
  it("should return the initial state", () => {
    const result = productsReducer(undefined, {} as any);
    expect(result).toEqual(productsInitialState);
  });
});

describe("Selected Product Reducer", () => {
  it("should return the initial state", () => {
    const result = selectedProductReducer(undefined, {} as any);
    expect(result).toEqual(initialSelectedProductState);
  });
});
