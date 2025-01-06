import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";
import SideToolBar from "./SideToolBar";
import useHLDStore from "../store/hld.store";
import { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { AppNode } from "../types/store.types";
import CustomDefaultNode from "./CustomDefaultNode";
import NodeProperties from "./NodeProperties";

const nodeTypes = {
    "custom-default-node": CustomDefaultNode
}

function HLDDiagram() {

    const { nodes, draggingNodeType, onNodeChange } = useHLDStore();

    const { screenToFlowPosition } = useReactFlow();


    const onDragOverFlow = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    const onNewNodeDropped = useCallback((event: React.DragEvent) => {

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        })

        let id = uuidv4();

        const newNode: AppNode = {
            id: id,
            position,
            type: draggingNodeType?.node_type,
            data: {
                label: draggingNodeType?.node_name,
                id: id,
                nodeDetails: draggingNodeType,
            }
        }

        
        useHLDStore.setState((state: any) => ({
            ...state,
            nodes: [...nodes, newNode],
            draggingNodeType: null,
        }))
    }, [screenToFlowPosition, draggingNodeType])


    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onDragOver={onDragOverFlow}
                onDrop={onNewNodeDropped}
                onNodesChange={onNodeChange}
            >
                <SideToolBar />
                <Background />
                <Controls />
                
            </ReactFlow>

            <NodeProperties />
        </div>
    );
}

export default HLDDiagram;
