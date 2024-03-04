import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../App";
import { fetchProduct } from "../../redux/actions/productActions";
import "./ProductDetails.styles.scss";
import RootState from "../../redux/store"; // Assuming you have a RootState type in your store

const ProductDetail: React.FC = () => {
  const [singleProduct, setSingleProduct] = React.useState<any>([]);
  const { selectedProductState } = React.useContext(AppContext);
  const dispatch = useDispatch();
  const { loading, error } = selectedProductState;
  const { id } = useParams<{ id: string }>();

  const singleProd = useSelector((state: typeof RootState) => state.product.product);

  console.log("singleProd", singleProd);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the action to fetch the product
        await dispatch(fetchProduct(parseInt(id, 10))); // Parse id as an integer
        // setSingleProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [dispatch, id]); // Include id as a dependency so useEffect is triggered when id changes

  // console.log("Single Product", singleProduct);
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
          {singleProd?.images.map((image, index) => (
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

export default ProductDetail;
