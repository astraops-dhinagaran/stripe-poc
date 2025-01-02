import { create } from "zustand";
import { ProductStoreType } from "../types/store.types";

const useProductStore = create<ProductStoreType>((set, get) => ({
    payButtonLoadingIndex: undefined,
    paymentStatus: undefined
}))

export default useProductStore;