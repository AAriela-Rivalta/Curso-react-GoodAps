import { useQuery } from "@tanstack/react-query";

import { getDetailsProducts } from "../services";

export function useDetailsProducts(id: number | undefined) {
    return useQuery({
        queryKey: ["details-products", id],
        queryFn: () => getDetailsProducts(id),
    });
}