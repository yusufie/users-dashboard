import { create } from "zustand";

type User = {
  fullName: string;
  email: string;
};

type StoreState = {
  user: User;
  setUser: (user: User) => void;
};

const useStore = create<StoreState>((set) => ({
  user: {
    fullName: "",
    email: "",
  },
  setUser: (user: User) => set(() => ({ user })),
}));

export default useStore;
