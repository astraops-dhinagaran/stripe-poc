import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { GetAxiosService, PostAxiosServiceWithToken } from "../../../libs/axiosservice/axios.service";
import { productListEndPoint, stripeInitiateEndPoint } from "../stripeembed.endpoints";
import Loader from "../../../components/ui/Loader";

export const getProductList = async () => {
    let response = await GetAxiosService({
        url: productListEndPoint
    })

    return response;
}

function PlansGrid() {

    const { data, isPending, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getProductList
    })

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<Record<string, any> | null>(null);

    const onPlanClick = async (plan: any) => {
        setSelectedPlan(plan);
        let response = await PostAxiosServiceWithToken({
            url: stripeInitiateEndPoint,
            body: {}
        })

        if (response != null) {
            setSelectedPlan({
                priceId: plan.stripePriceId, 
                customerId: response.stripeCustomerId as string,
                quantity: 1,
                stripeProductId: plan.stripeProductId
            })
        }
        setShowModal(true);
    }

    return (
        <div>
            {
                isPending ? <Loader /> :
                <div className="grid grid-cols-3 gap-4 m-2 ">
                    {
                        data.map((plan: any, index: number) => (
                            <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between" key={plan.id}>
                                <div>
                                    <div className="my-2 text-lg font-bold">{plan.name}</div>
                                <div className="my-2 text-sm text-gray-500">{plan.description}</div>
                                <div className="my-2 flex items-center gap-2">
                                    <div className="text-lg font-bold">{plan.price}</div>
                                    <div className="text-sm text-gray-500">{plan.currency}</div>
                                </div>
                                <div className="my-2 text-sm text-gray-500">Credit Card Required: {plan.isCreditCardRequired ? 'Yes' : 'No'}</div>
                                <ul className="my-2">{
                                    plan.features.map((feature: any) => (
                                        <li key={feature.id} className="text-sm text-gray-500 flex items-center gap-2">
                                            <i className="pi pi-check w-4 h-4 text-green-500" />
                                            <p>{feature}</p>
                                        </li>
                                    ))
                                    }
                                </ul>
                                </div>
                                <Button onClick={() => onPlanClick(plan)}>Pay</Button>
                            </div>
                        ))
                    }
                </div>
            }
            <Dialog visible={showModal} onHide={() => setShowModal(false)}>
                <StripeCheckoutForm selectedPlan={selectedPlan} />
            </Dialog>
        </div>
    );
}

export default PlansGrid;