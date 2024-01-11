import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "../../assets/css/checkoutForm.css";
import { axiosPost } from "../../helpers/Master_helper";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [client_Secret, setClient_Secret] = useState("");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    setClient_Secret(clientSecret);
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    //return false
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/admin/payments",
      },
    });
    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "requires_action") {
      // Use handleCardAction to handle 3D Secure without a pop-up
      const { paymentIntent: updatedPaymentIntent, error: actionError } =
        await stripe.handleCardAction(paymentIntent.client_secret);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      updateUserPaymentStatus(paymentIntent.id);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  function updateUserPaymentStatus(transaction_id) {
    axiosPost(
      "http://127.0.0.1:8000/api/payments/update_user_payment_status/",
      { transaction_id: transaction_id },
      function (res) {
        console.log(res);
      }
    );
  }

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
