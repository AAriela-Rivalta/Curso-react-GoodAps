import { useQuery } from "@tanstack/react-query";
import { getDetailsProducts } from "../services";

export function useDetailsProducts(id: number) {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getDetailsProducts(id),
    enabled: !!id, // 👈 evita correr el hook si no hay id
  });
}