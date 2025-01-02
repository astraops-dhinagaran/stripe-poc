import { Button } from "primereact/button";
import useProductStore from "../store/products.store";
import { PostAxiosServiceWithToken } from "../../../libs/axiosservice/axios.service";
import { productCheckoutEndPoint, productPaymentInitiationEndPoint } from "../product.endpoints";
import { ProductPaymentCheckoutWithStripeSchema } from "../schemas/payment.schemas";
import { redirect } from "@tanstack/react-router";

function StripePayButton(rowData, column) {

    const { payButtonLoadingIndex, paymentStatus } = useProductStore()

    const initiatePayment = async () => {
        useProductStore.setState((state) => ({
            ...state,
            payButtonLoadingIndex: column.rowIndex,
            paymentStatus: 'Initiating'
        }))

        let response = await PostAxiosServiceWithToken({
            url: productPaymentInitiationEndPoint,
            body: {}
        })

        if (response != null) {
            console.log("init", response)
            checkoutPayment(rowData.stripePriceId, response.stripeCustomerId as string)
        }

    }

    const checkoutPayment = async (priceId: string, customerId: string) => {
        useProductStore.setState((state) => ({
            ...state,
            paymentStatus: 'Processing'
        }))
        let response = await PostAxiosServiceWithToken({
            url: productCheckoutEndPoint,
            body: ProductPaymentCheckoutWithStripeSchema.parse({
                customerId: customerId,
                priceId: priceId,
                quantity: 1
            })
        })

        if (response != null) {
            console.log("Checkout", response)
            window.location.replace(response.redirectUrl)
        }

        useProductStore.setState((state) => ({
            ...state,
            payButtonLoadingIndex: undefined,
            paymentStatus: undefined
        }))
    }

    return (
        <Button onClick={initiatePayment} className="w-fit">{
            payButtonLoadingIndex == column.rowIndex ? paymentStatus : 'Pay'
        }</Button>
    );
}

export default StripePayButton;