import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "./Product.module.css";
import Loader from  "../Loader/Loader"
function Product() {
  const [product, setproduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setproduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={style.products_container}>
          {product?.map((singleProduct, i) => {
            return (
              <ProductCard renderAdd={true} product={singleProduct} key={i} />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
