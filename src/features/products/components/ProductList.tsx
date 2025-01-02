import { useQuery } from "@tanstack/react-query";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { GetAxiosService } from "../../../libs/axiosservice/axios.service";
import { productListEndPoint } from "../product.endpoints";
import Loader from "../../../components/ui/Loader";
import CreditCardAvailable from "./CreditCardAvailable";
import TableActions from "./TableActions";

export const getProductList = async () => {
    let response = await GetAxiosService({
        url: productListEndPoint
    })

    return response;
}

function ProductsList() {

    const { data, isPending, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getProductList
    })

    return (
        isPending ? <Loader /> :
            <DataTable value={data}>
                <Column field="name" header="Name" />
                <Column field="price" header="Price" />
                <Column field="description" header="Description" />
                <Column field="currency" header="Currency" />
                <Column field="isCreditCardRequired" header="Credit Card Available" body={CreditCardAvailable} />
                <Column field="actions" header="Actions" body={TableActions} />
            </DataTable>
    );
}

export default ProductsList;