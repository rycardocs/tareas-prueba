import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { DatosUsuarioStore } from "../Types/types";

export const useLoginStore = create<DatosUsuarioStore>()(
  persist(
    (set) => ({
      UUID: "",
      addUser: (uuid) =>
        set(() => ({
          UUID: uuid
        })),
    }),
    { name: "user", storage: createJSONStorage(() => localStorage) }
  )
);
