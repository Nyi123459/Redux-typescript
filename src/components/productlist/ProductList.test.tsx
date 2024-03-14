import { render } from "@testing-library/react";
import configureStore from "redux-mock-store"; // Install redux-mock-store if not already installed
import ProductList from "./ProductList"; // Assuming this is your component file
import { selectProducts } from "./ProductList";
import { Provider } from "react-redux";

// Mocking the useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("ProductList Component", () => {
  const mockStore = configureStore();
  let store: any;
  beforeEach(() => {
    store = mockStore({
      // Mocking the Redux store state
      products: {
        products: [
          // Mock product data
          {
            id: 1,
            title: "Product 1",
            thumbnail: "path/to/thumbnail1.jpg",
          },
          {
            id: 2,
            title: "Product 2",
            thumbnail: "path/to/thumbnail2.jpg",
          },
          // Add more mock products as needed
        ],
      },
    });
  });

  it("renders product list correctly", () => {
    // Mocking the useSelector hook to return products from the Redux store state
    selectProducts.mockImplementation = jest.fn(() => {
      return (selector: any) => selector(store.getState());
    });

    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // Asserting that product titles are rendered correctly
    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();

    // Asserting that product thumbnails are rendered correctly
    expect(getByAltText("Product 1")).toBeInTheDocument();
    expect(getByAltText("Product 2")).toBeInTheDocument();
  });
});
