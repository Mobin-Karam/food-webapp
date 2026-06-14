// modal/types.ts
export type ModalType = "center" | "drawer";

export type ModalConfig = {
  id: string;
  content: React.ReactNode;
  type?: ModalType;
};