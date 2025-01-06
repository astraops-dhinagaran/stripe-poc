import { create } from "zustand";
import { HLDStoreType } from "../types/store.types";
import { applyNodeChanges, NodeChange } from "@xyflow/react";

const useHLDStore = create<HLDStoreType>((set, get) => ({
    draggingNodeType: null,
    nodes: [],
    isNodePropertiesOpen: false,
    hldProperties: [],
    currentNode: null,
    zodSchemaValidation: null,
    onNodeChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes)
        });
    },
}))

export default useHLDStore;