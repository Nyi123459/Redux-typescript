import React, { createContext, useReducer, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dispatch } from "redux";
import { fetchProducts } from "./redux/actions/productActions";
import { Product } from "./redux/actions/productActions";
import {
  productsReducer,
  selectedProductReducer,
} from "./redux/reducers/productsReducer";

import Authentication from "./routes/authentication/authentication";

import Navigation from "./routes/navigation/navigation";

import ProductList from "./components/productlist/ProductList";

import ProductDetail from "./components/product-details/ProductDetail";

interface AppState {
  products: Product[];
  loading: boolean;
  error: any;
}

interface SelectedProductState {
  loading: boolean;
  product: Product | null;
  error: any;
}

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
  selectedProductState: SelectedProductState;
  selectedProductDispatch: React.Dispatch<any>;
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

  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    setLocalLoading(true);

    fetchProducts()(dispatch as Dispatch)
      .then((products) => {
        console.log("Products", products);
        setLocalLoading(false);
      })
      .catch((error) => {
        setLocalLoading(false);
        console.error("Error fetching product:", error);
      });
  }, []);

  if (localLoading) {
    return <h2>Loading ...</h2>;
  }

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
          {/* <Route path="/" element={<Navigation />} /> */}
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
