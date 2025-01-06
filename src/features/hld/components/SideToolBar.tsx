import useHldComponents from "../hooks/useHldComponents";
import useHLDStore from "../store/hld.store";

function SideToolBar() {

    const { data, isLoading, error } = useHldComponents();

    const onNewNodeDragStart = (event: React.DragEvent, node: any) => {

        useHLDStore.setState((state: any) => ({
            ...state,
            draggingNodeType: node
        }))

        event.dataTransfer.effectAllowed = 'move';
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="w-[230px] h-full shadow-md bg-white p-5 absolute top-0 right-0 z-50">
          {data.map((component: any) => (
            <div
            draggable={true} onDragStart={(event) => onNewNodeDragStart(event, component)}
              className="w-[50px] h-[50px] bg-gray-500 text-white flex items-center justify-center rounded-md"
              key={component.node_name}
            >
              {component.node_name}
            </div>
          ))}
        </div>
    );
}

export default SideToolBar;