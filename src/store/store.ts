import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    fullName: "",
    email: "",
  },
  setUser: (user) => set(() => ({ user })),
}));

export default useStore;
