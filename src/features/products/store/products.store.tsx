import { create } from "zustand";
import { ProductStoreType } from "../types/store.types";

const useProductStore = create<ProductStoreType>((set, get) => ({
    deleteButtonLoadingIndex: undefined,
    deleteStatus: undefined,
    
}))

export default useProductStore;