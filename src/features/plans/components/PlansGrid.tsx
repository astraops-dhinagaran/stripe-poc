import { useQuery } from "@tanstack/react-query";
import { GetAxiosService } from "../../../libs/axiosservice/axios.service";
import Loader from "../../../components/ui/Loader";
import { productListEndPoint } from "../../products/product.endpoints";
import StripePayButton from "./StripePayButton";

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

    return (
        isPending ? <Loader /> :
            <div className="grid grid-cols-3 gap-4 m-2 ">
                {
                    data.map((plan: any, index: number) => (
                        <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between" key={plan.id}>
                            <div>
                                <div className="my-2 text-lg font-bold">{plan.name}</div>
                            <div className="my-2 text-sm text-gray-500">{plan.description}</div>
                            <div className="my-2flex items-center gap-2">
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
                            <StripePayButton rowData={plan} rowIndex={index} />
                        </div>
                    ))
                }
            </div>
    );
}

export default PlansGrid;