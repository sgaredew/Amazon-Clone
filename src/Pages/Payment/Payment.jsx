import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { red } from "@mui/material/colors";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  {
    /*function for telling us total item on the cart */
  }
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  {
    /*function for calculating total price */
  }

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  {
    /*defining error handling function */
  }
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(null);
  };

  // Continue processing the payment using Stripe
const handlePayment = async (e) => {
  e.preventDefault();
  try {
    setProcessing(true);

    // 1. Create a payment intent on the backend
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`, 
    });

    const clientSecret = response.data?.clientSecret;
    if (!clientSecret) {
      console.error("Client secret not received");
      setProcessing(false);
      return;
    }

    console.log("Client Secret:", clientSecret);

    // 2. Confirm the payment on the client side
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
      setProcessing(false);
      return;
    }

    console.log("Payment Intent:", paymentIntent);

    // 3. Write order to Fire store after successful payment
    if (paymentIntent.status === "succeeded") {
      if (!user) {
        console.error("User is not authenticated");
        setProcessing(false);
        return;
      }

      await db
        .collection("users")
        .doc(user.uid)
        .collection("Orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      console.log("Order saved to Firestore");

      // 4. Dispatch action to clear the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setProcessing(false);

      // 5. Navigate to orders page with a success message
      navigate("/Orders", { state: { msg: "You have placed a new order" } });
    }
  } catch (error) {
    console.error("Error during payment:", error);
    setProcessing(false);
  }
};
  
  return (
    <LayOut>
      {/*header */}
      <div className={classes.payment_header}>Checkout ({totalItem} )items</div>

      <section className={classes.payment}>
        {/*address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>3008 W CourtYard</div>
            <div>Sioux Falls, SD</div>
          </div>
        </div>
        <hr />
        {/* {/products/} */}
        <div className={classes.flex}>
          <h3>Review itrem and deliver info. </h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/*payment form */}
        <div className={classes.flex}>
          <h3>payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/*display error if there is */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/*importing smart card from stripe */}
                <CardElement onChange={handleChange} />

                {/*price total */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={35} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

