import { ActionTypes } from "../../constants/action-types";
import fetchMock from "jest-fetch-mock";
import { fetchProducts } from "./productActions";


describe("fetchProducts", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("dispatches FETCH_PRODUCTS_SUCCESS on successful fetch", async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const mockData = data;
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const dispatch = jest.fn();

    await fetchProducts()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.FETCH_PRODUCTS_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: mockData.products,
    });
  });
  it("dispatches FETCH_PRODUCTS_FAILURE on failed fetch", async () => {
    const errorMessage = "Failed to fetch products";
    fetchMock.mockRejectOnce(new Error(errorMessage));

    const dispatch = jest.fn();

    try {
      await fetchProducts()(dispatch);
    } catch (error: any) {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_PRODUCTS_REQUEST,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.FETCH_PRODUCTS_FAILURE,
        payload: errorMessage,
      });
      expect(error.message).toBe(errorMessage);
    }
  }, 10000);
});
