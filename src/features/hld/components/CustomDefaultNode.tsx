import { NodeToolbar, Position } from "@xyflow/react";
import useHLDStore from "../store/hld.store";
import { Button } from "primereact/button";
import { z } from "zod";
function CustomDefaultNode({ data }: { data: any }) {

    const { width, height } = data?.nodeDetails?.node_style;

    const setIsNodePropertiesOpen = (value: boolean) => {
        useHLDStore.setState((state) => ({
            ...state,
            isNodePropertiesOpen: value
        }))
    }

    const onEditNode = async () => {
        let response = await fetch(`/src/features/hld/data/hldproperties.data.json`);
        let json = await response.json();
        useHLDStore.setState((state) => ({
            ...state,
            hldProperties: json,
            currentNode: data.id
        }));
        setIsNodePropertiesOpen(true)

        let zodSchema: Record<string, any> = {}

        for (var i = 0; i < json.length; i++) {
          if (json[i].is_required) {
            if (json[i].field_type === "input") {
              zodSchema[json[i].field_name] = z.string().min(1, { message: "This field is required" })
            } else if (json[i].field_type === "select") {
              zodSchema[json[i].field_name] = z.string().min(1, { message: "This field is required" })
            } else if (json[i].field_type === "checkbox") {
              zodSchema[json[i].field_name] = z.boolean()
            } else if (json[i].field_type === "radio") {
              zodSchema[json[i].field_name] = z.string()
            }
          } else {
            if (json[i].field_type === "input") {
              zodSchema[json[i].field_name] = z.string().optional()
            } else if (json[i].field_type === "select") {
              zodSchema[json[i].field_name] = z.string().optional()
            } else if (json[i].field_type === "checkbox") {
              zodSchema[json[i].field_name] = z.boolean().optional()
            } else if (json[i].field_type === "radio") {
              zodSchema[json[i].field_name] = z.string().optional()
            }
          }

        }
        
        let zodSchemaValidation = z.object(zodSchema);
        useHLDStore.setState((state) => ({
          ...state,
          zodSchemaValidation: zodSchemaValidation
        }));
    }

  return (
    <>
    <NodeToolbar position={Position.Top} >
        <Button onClick={() => onEditNode()} icon="pi pi-pencil" />
    </NodeToolbar>
    <div className={`border rounded p-4 `} style={{width: width, height: height}}>
      <div style={{backgroundColor: data?.nodeDetails?.color}} className={` absolute top-0 left-0  text-white p-2`}>
        {data?.label as string}
      </div>
    </div>
    </>
  );
}

export default CustomDefaultNode;
