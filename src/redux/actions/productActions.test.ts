import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import fetchMock from "jest-fetch-mock";
import { fetchProducts } from "./productActions";
import { ActionTypes } from "../../constants/action-types";
import { Product } from "./productActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as any);

describe("Redux Thunk Actions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetchProducts Action creates FETCH_PRODUCTS_SUCCESS when fetching product is success", async () => {
    const numberOfProducts = 30;
    const expectedProducts: Product[] = Array.from({
      length: numberOfProducts,
    });
    fetchMock.mockResponseOnce(JSON.stringify({ products: expectedProducts }));
    const store = mockStore();
    await store.dispatch(fetchProducts() as any);

    const expectedActions = [
      { type: ActionTypes.FETCH_PRODUCTS_REQUEST },
      { type: ActionTypes.FETCH_PRODUCTS_SUCCESS, payload: expectedProducts },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  test("fetchProducts action creates FETCH_PRODUCTS_FAILURE when fetching products fails", async () => {
    const errorMessage = "Failed to fetch products";
    fetchMock.mockResponseOnce(new Error(errorMessage) as any);
    const store = mockStore({});
    let error;

    try {
      await store.dispatch(fetchProducts() as any);
    } catch (e) {
      error = e;
    }
    const expectedActions = [
      { type: ActionTypes.FETCH_PRODUCTS_REQUEST },
      { type: ActionTypes.FETCH_PRODUCTS_FAILURE, payload: errorMessage },
    ];
    expect(store.getActions()).toEqual(expectedActions);
    expect(error).toBeDefined();
  });
});
