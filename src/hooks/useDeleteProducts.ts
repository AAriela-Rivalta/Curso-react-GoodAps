import { useMutation } from "@tanstack/react-query";

import { deleteProducts } from "../services";

export function useDeleteProducts() {
    return useMutation({
        mutationKey: ["delete-products"],
        mutationFn: (id: number | undefined) => deleteProducts(id),
    })
}