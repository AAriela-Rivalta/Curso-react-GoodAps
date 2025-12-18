import { createContext } from 'react';

export type User = {
  id: number;
  username: string;
};

export const UserContext = createContext<User | null>(null);