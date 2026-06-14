// modal/ModalContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { ModalConfig } from "./modal";

type ModalContextType = {
  open: (config: Omit<ModalConfig, "id">) => string;
  close: (id?: string) => void;
  modals: ModalConfig[];
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const open = (config: Omit<ModalConfig, "id">) => {
    const id = crypto.randomUUID();

    setModals((prev) => [
      ...prev,
      { id, ...config },
    ]);

    return id;
  };

  const close = (id?: string) => {
    if (!id) return setModals([]);
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <ModalContext.Provider value={{ open, close, modals }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be inside ModalProvider");
  return ctx;
};