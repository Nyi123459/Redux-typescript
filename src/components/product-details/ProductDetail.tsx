import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../App";
import { fetchProduct } from "../../redux/actions/productActions";
import "./ProductDetails.styles.scss";
import { Product } from "../../redux/actions/productActions";
import { Rootstate } from "../../redux/reducers";

const ProductDetail: React.FC = () => {
  const { selectedProductState } = React.useContext(AppContext);
  const dispatch = useDispatch();
  const { loading, error } = selectedProductState;
  const { id } = useParams<{ id: string }>();

  const singleProd = useSelector<Rootstate, Product | null>(
    (state) => state.product.product
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) await dispatch(fetchProduct(parseInt(id)) as any);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-container">
      <div className="image-container">
        <img src={singleProd?.images[0]} alt="" />
      </div>
      <div className="detail-container">
        <div className="header container">
          <p className="title">{singleProd?.title}</p>
          <p className="price">{singleProd?.price}$</p>
        </div>
        <div className="product-detail-container">
          <p className="description">{singleProd?.description}</p>
          <p className="disountPercentage">
            ${singleProd?.price} - {singleProd?.discountPercentage} % OFF
          </p>
          <p className="rating">{singleProd?.rating}</p>
          <p className="brand">{singleProd?.brand}</p>
          <p className="category">{singleProd?.category}</p>
        </div>
        <div className="thumbnail-container">
          {singleProd?.images.map((image: any, index: any) => (
            <img
              key={index}
              src={image}
              alt={`${singleProd?.title}-image-${index}`}
              className="image-thumbnail"
            />
          ))}
        </div>
        <button className="button-container">Add To Cart</button>
      </div>
    </div>
  );
};

export const getProduct = (state: Rootstate) => state.product.product;

export default ProductDetail;
