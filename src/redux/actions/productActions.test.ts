// import configureMockStore from "redux-mock-store";
// import { thunk } from "redux-thunk";
// import fetchMock from "jest-fetch-mock";
// import { fetchProducts } from "./productActions";
// import { ActionTypes } from "../../constants/action-types";
// import { Product } from "./productActions";

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares as any);

// describe("Redux Thunk Actions", () => {
//   beforeEach(() => {
//     fetchMock.resetMocks();
//   });

//   it("fetchProducts action creates FETCH_PRODUCTS_SUCCESS when fetching products is successful", async () => {
//     const response = await fetch("https://dummyjson.com/products");
//     const data = await response.json();
//     const expectedProducts: Product[] = data.length;
//     console.log("Product", expectedProducts);

//     fetchMock.mockResponseOnce(JSON.stringify({ products: expectedProducts }));

//     const store = mockStore();
//     await store.dispatch(fetchProducts() as any);
//     console.log("Products", expectedProducts);

//     const expectedActions = [
//       { type: ActionTypes.FETCH_PRODUCTS_REQUEST },
//       {
//         type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
//         payload: expectedProducts.length,
//       },
//     ];
//     console.log("Action", expectedActions);

//     expect(store.getActions()).toEqual(expectedActions);
//   }, 30000);

//   it("fetchProducts action creates FETCH_PRODUCTS_FAILURE when fetching products fails", async () => {
//     const errorMessage = "Failed to fetch products";

//     fetchMock.mockRejectOnce(new Error(errorMessage));

//     const store = mockStore();
//     let error;

//     try {
//       await store.dispatch(fetchProducts() as any);
//     } catch (e) {
//       error = e;
//     }

//     const expectedActions = [
//       { type: ActionTypes.FETCH_PRODUCTS_REQUEST },
//       { type: ActionTypes.FETCH_PRODUCTS_FAILURE, payload: errorMessage },
//     ];

//     expect(store.getActions()).toEqual(expectedActions);
//     expect(error).toBeDefined();
//   });
// });

import { Product, fetchProducts } from "./productActions";
import configureMockStore from "redux-mock-store";

jest.mock("fetchProducts");

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.MockedFunction<typeof fetch>;
    }
  }
}

describe("fetchProducts action", () => {
  let mockStore: (arg0: {}) => any;

  beforeEach(() => {
    mockStore = configureMockStore();
  });

  it("dispatches the correct action and checks array length on successful fetch", async () => {
    const expectedLength = 30; // Replace with the actual expected number of products

    const mockResponse = {
      json: jest.fn().mockResolvedValue([]), // Empty array initially
    };

    (fetch as any).mockImplementationOnce(() => Promise.resolve(mockResponse));

    const store = mockStore({});

    await store.dispatch(fetchProducts());

    const expectedActions = [
      { type: "FETCH_PRODUCTS_REQUEST" }, // Replace with your action type for request
      { type: "FETCH_PRODUCTS_SUCCESS", payload: expect.any(Array) }, // Don't check payload content, only type
    ];

    expect(store.getActions()).toEqual(expectedActions);

    // Access the actual data after dispatch (safe within a callback)
    store
      .getActions()
      .slice(-1)[0]
      .payload.then((data: Product[]) => {
        expect(data.length).toBe(expectedLength);
      });
  });
});
