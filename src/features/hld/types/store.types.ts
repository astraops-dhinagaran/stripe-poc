import { Edge, Node, OnNodesChange } from "@xyflow/react";
import { ZodSchema } from "zod";

export type AppNode = Node
export type AppEdge = Edge

export interface AppNodeType {
    node_type: string;
    node_name: string;
    color: string;
    node_style: {
        width: string;
        height: string;
    }
}

export interface HLDStoreType {
    nodes: AppNode[];
    draggingNodeType: AppNodeType | null;
    onNodeChange: OnNodesChange;
    isNodePropertiesOpen: boolean;
    hldProperties: any[];
    currentNode: string | null;
    zodSchemaValidation: ZodSchema | null;
}