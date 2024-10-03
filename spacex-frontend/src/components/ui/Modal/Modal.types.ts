import type { ReactNode, HTMLAttributes } from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  closeButton?: boolean;
}
