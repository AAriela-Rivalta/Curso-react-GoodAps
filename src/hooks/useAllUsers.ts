import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services";

export function useAllUsers(page: number) { //el hook tambien recibe la pagina, permite que React Query reaccione al cambio de página
  return useQuery({
    queryKey: ["all-users", page], //•cada pagina tiene su propio key -> ["all-users", 1] •React Query: cachea cada página, evita refetch innecesario, 
    //permite volver a páginas anteriores sin volver a pedir datos
    queryFn: () => getAllUsers(page), //•la query depende de page •cuando page cambia -> se ejecuta un nuevo fetch
    placeholderData: (previousData) => previousData, //cuando cambias de pagina no se borren los usuarios anteriores, se mantiene la data
    //hasta que llega la nueva
  });
}