import { create } from "zustand";
import { PlanStoreType } from "../types/store.types";

const usePlansStore = create<PlanStoreType>((set, get) => ({
    paymentButtonLoadingIndex: undefined,
    paymentStatus: undefined,
}))

export default usePlansStore;