import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services";

export function useAllProducts() {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
  });
}