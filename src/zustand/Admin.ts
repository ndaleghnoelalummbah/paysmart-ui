// stores/useUserStore.ts
import { Admin } from "@/utils/types";
import create from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: Admin | null;
  setUser: (user: Admin) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
        localStorage.clear();
      },
    }),
    {
      name: "user-storage", // name of the item in the storage
      getStorage: () => localStorage, // (optional) by default 'localStorage' is used
    },
  ),
);

interface AdminsState {
  admins: Admin[];
  setAdmins: (admins: Admin[]) => void;
  addAdmin: (admin: Admin) => void;
  removeAdmin: (id: number) => void;
  clearAdmins: () => void;
}

export const useAdminsStore = create<AdminsState>()(
  persist(
    (set, get) => ({
      admins: [],
      setAdmins: (admins: Admin[]) => set({ admins }),
      addAdmin: (admin: Admin) => set({ admins: [...get().admins, admin] }),
      removeAdmin: (id: number) =>
        set({ admins: get().admins.filter((admin: Admin) => admin.id !== id) }),
      clearAdmins: () => set({ admins: [] }),
    }),
    {
      name: "admins-storage", // name of the item in the storage
      getStorage: () => localStorage, // (optional) by default 'localStorage' is used
    },
  ),
);
