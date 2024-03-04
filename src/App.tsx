import React, { createContext, useReducer, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductList from "./components/productlist/ProductList";
import ProductDetail from "./components/product-details/ProductDetail";
import { fetchProducts } from "./redux/actions/productActions";

import { Product } from "./redux/actions/productActions";

import {
  productsReducer,
  selectedProductReducer,
} from "./redux/reducers/productsReducer";

interface AppState {
  products: Product[];
  loading: boolean;
  error: any; // Change the type based on your error handling
}

interface SelectedProductState {
  loading: boolean;
  product: Product | null;
  error: any; // Change the type based on your error handling
}

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>; // Adjust the type based on your actions
  selectedProductState: SelectedProductState;
  selectedProductDispatch: React.Dispatch<any>; // Adjust the type based on your actions
}>({
  state: {
    products: [],
    loading: false,
    error: null,
  },
  dispatch: () => {},
  selectedProductState: {
    loading: false,
    product: null,
    error: null,
  },
  selectedProductDispatch: () => {},
});

const App: React.FC = () => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
    loading: false,
    error: null,
  } as AppState);

  const [selectedProductState, selectedProductDispatch] = useReducer(
    selectedProductReducer,
    {
      loading: false,
      product: null,
      error: null,
    } as SelectedProductState
  );

  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    setLocalLoading(true);

    fetchProducts()(dispatch as Dispatch)
      .then(() => {
        setLocalLoading(false);
      })
      .catch((error) => {
        setLocalLoading(false);
        console.error("Error fetching product:", error);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        selectedProductState,
        selectedProductDispatch,
      }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
