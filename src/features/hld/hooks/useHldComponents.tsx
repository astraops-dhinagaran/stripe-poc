import { useQuery } from "@tanstack/react-query";

const getHldComponents = async () => {
    const response = await fetch(`/src/features/hld/data/hldcomponents.data.json`);
    return await response.json();
}

function useHldComponents() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['hld-components'],
        queryFn: () => getHldComponents()
    });

    return { data, isLoading, error };
}

export default useHldComponents;
