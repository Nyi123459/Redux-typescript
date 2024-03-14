import { Dispatch } from "redux";
import { ActionTypes } from "../../constants/action-types";
import fetchMock from "jest-fetch-mock";

const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.FETCH_PRODUCTS_REQUEST });

      const response = await fetch("https://dummyjson.com/products"); // Now uses mocked fetch
      const data = await response.json();
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: data.products || [],
      });
      return data.products;
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_FAILURE,
        payload: error.message,
      });

      throw error;
    }
  };
};

describe("fetchProducts", () => {
  afterEach(() => {
    fetchMock.resetMocks(); // Clear mocks after each test
  });

  it("dispatches FETCH_PRODUCTS_SUCCESS on successful fetch", async () => {
    const response = await fetch("https://dummyjson.com/products"); // Now uses mocked fetch
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
});
