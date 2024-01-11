import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
        // Handle payment logic here
      };
  return (
    <form onSubmit={handleSubmit}>
    <CardElement />
    <button type="submit" disabled={!stripe}>
      Pay
    </button>
  </form>
  );
};

export default CheckoutForm;