import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { stripeCreateCheckoutSessionEndPoint } from "../stripeembed.endpoints";
import { PostAxiosServiceWithToken } from "../../../libs/axiosservice/axios.service";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeCheckoutForm = ({selectedPlan}: {selectedPlan: any}) => {
    const fetchClientSecret = useCallback( async () => {
      // Create a Checkout Session
      let response = await PostAxiosServiceWithToken({
        url: stripeCreateCheckoutSessionEndPoint,
        body: selectedPlan
      })
      console.log(response);
      return response.clientSecret;
    }, []);
  
    const options = {fetchClientSecret};
  
    return (
      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }

export default StripeCheckoutForm;