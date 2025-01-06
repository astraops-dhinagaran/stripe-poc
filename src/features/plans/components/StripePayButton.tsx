import { Button } from "primereact/button";
import usePlansStore from "../../plans/store/plans.store";
import { PostAxiosServiceWithToken } from "../../../libs/axiosservice/axios.service";
import { productCheckoutEndPoint, productPaymentInitiationEndPoint } from "../../products/product.endpoints";
import { ProductPaymentCheckoutWithStripeSchema } from "../../products/schemas/payment.schemas";

function StripePayButton({ rowData, rowIndex }: {
    rowData: any,
    rowIndex: number
}) {

    const { paymentButtonLoadingIndex, paymentStatus } = usePlansStore()

    const initiatePayment = async () => {
        usePlansStore.setState((state) => ({
            ...state,
            paymentButtonLoadingIndex: rowIndex,
            paymentStatus: 'Initiating'
        }))

        let response = await PostAxiosServiceWithToken({
            url: productPaymentInitiationEndPoint,
            body: {}
        })

        if (response != null) {
            checkoutPayment(rowData.stripePriceId, response.stripeCustomerId as string)
        }

    }

    const checkoutPayment = async (priceId: string, customerId: string) => {
        usePlansStore.setState((state) => ({
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
            window.location.replace(response.redirectUrl)
        }

        usePlansStore.setState((state) => ({
            ...state,
            paymentButtonLoadingIndex: undefined,
            paymentStatus: undefined
        }))
    }

    return (
        <Button onClick={initiatePayment} className="w-fit">{
            paymentButtonLoadingIndex == rowIndex ? paymentStatus : 'Select Plan'
        }</Button>
    );
}

export default StripePayButton;