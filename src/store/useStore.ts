import { create } from "zustand";

export type User = {
  email: string;
  role: "admin" | "user";
};

type Store = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
