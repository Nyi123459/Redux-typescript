import { fetchProducts } from "./productActions";
import { ActionTypes } from "../../constants/action-types";
import fetchMock from "jest-fetch-mock";

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

  it("count the array length", async () => {
    const response = await fetch("https://dummyjson.com/products"); 
    const data = await response.json();
    const mockData = data;

    expect(mockData.products.length).toEqual(30);
  });
});
