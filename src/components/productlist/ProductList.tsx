import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { Rootstate } from "../../redux/reducers";
import "./ProductLists.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { state } = useContext(AppContext);
  const products = useSelector((state: Rootstate) => state?.products?.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {state.loading && <p>Loading...</p>}
      {state.error && <p className="text-red-500">Error: {state.error}</p>}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
