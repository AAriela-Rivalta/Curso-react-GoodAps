import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services";

export function useAllUsers() {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });
}