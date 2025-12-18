import { create } from "zustand";

type User = {
    id: number;
    username: string;
};

type UserStore = {
    user: User;
};

export const useUserStore = create<UserStore>( () => ({
    user:{
        id: 1,
        username: "john_doe",
    },
}));