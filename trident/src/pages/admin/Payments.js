import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { axiosPost } from "../../helpers/Master_helper";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CheckoutForm from "../../components/payment/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51OTO2ZSE2AFTsjwi7EZenOiKPlgkFa9yARvxYvgxpDWv0yfQHbWMldkcluye9PCjKydv3pAWVkrp0YBPGGl0rrRW00ZthCrad4"
);

const Payments = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [paymentLink, setPaymentLink] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [proceedToPay, setProceedToPay] = useState(true);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    //createPaymentLink();
  }, []);
  const createPaymentLink = async (data) => {
    const stripe = await stripePromise;
    axiosPost(
      "http://127.0.0.1:8000/api/payments/create_payment_link/",
      { amount: data.amount },
      function (res) {
        setClientSecret(res.data.client_secret);
        setProceedToPay(false);
      }
    );
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={4}>
            <div className="text-center pt-3">
              <Form onSubmit={handleSubmit(createPaymentLink)}>
                <Form.Group className="mb-3" controlId="amount">
                  <Form.Control
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    {...register("amount", {
                      required: "Amount is required",
                    })}
                  />
                  {errors.amount && (
                    <p className="errorMsg">{errors.amount.message}</p>
                  )}
                </Form.Group>
                <div className="d-grid gap-2">
                  {proceedToPay && (
                    <Button variant="primary" type="submit" size="lg">
                      Proceed to Pay
                    </Button>
                  )}
                </div>
              </Form>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payments;
