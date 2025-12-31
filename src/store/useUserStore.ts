import { create } from "zustand";
import { persist } from "zustand/middleware"; // Importa el middleware

type User = {
    id: number;
    username: string;
    image?: string; // Agregamos imagen opcional
};

type UserStore = {
    user: User;
    setUser: (newUser: User) => void; // Función para actualizar el usuario
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: { id: 0, username: "Invitado" },
      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "user-storage", // nombre de la llave en el localStorage
    }
  )
);