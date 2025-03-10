import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard"
import { ProductUrl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading ] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${ProductUrl}/products/${productId}`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      {isLoading? (<Loader/>):(<ProductCard 
        Product={products}
        flex={true}
         renderDesc={true}
         renderAdd={true}
          />)}

    </LayOut>
  );
}

export default ProductDetail;
