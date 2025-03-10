import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/Firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import style from "./Orders.module.css";
import ProductCard from "../../Components/Product/ProductCard"
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot?.docs?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
  <Layout>
    <section className={style.container}>
      <div className={style.orders_container}>
        <h2>Your Orders</h2>
        {orders?.length == 0 && (
          <div style={{padding:"20px"}}>You don't have orders .</div>
        
          )}
        {/* order items */}

        <div>
          {orders?.map((eachOrder, i) => (
            <div key={i}>
              <hr />
              <p>Order ID: {eachOrder?.id}</p>
              {eachOrder?.data?.basket?.map((order) => (
                <ProductCard flex={true} product={order} key={order.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);}

export default Orders;
