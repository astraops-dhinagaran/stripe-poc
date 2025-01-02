import { Button } from "primereact/button";
import { DeleteAxiosService } from "../../../libs/axiosservice/axios.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productListEndPoint } from "../product.endpoints";
import useProductStore from "../store/products.store";

function TableActions(rowData, column) {

    const { deleteButtonLoadingIndex, deleteStatus } = useProductStore()

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data) => {
            useProductStore.setState((state) => ({
                ...state,
                deleteButtonLoadingIndex: column.rowIndex,
                deleteStatus: 'Deleting'
            }))
            return DeleteAxiosService({url: productListEndPoint + '/' + rowData._id})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            useProductStore.setState((state) => ({
                ...state,
                deleteButtonLoadingIndex: undefined,
                deleteStatus: undefined
            }))
        },
    });

    return (
        <Button type="button" className="w-fit bg-red-500 text-white" onClick={() => mutate()}>{deleteButtonLoadingIndex == column.rowIndex ? deleteStatus : 'Delete'}</Button>
    );
}

export default TableActions;