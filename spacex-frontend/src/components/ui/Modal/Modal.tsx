"use client";
import { ArrowBackCircleIcon } from "@/assets/icons/arrow-back-circle-icon";
import { TrashIcon } from "@/assets/icons/trash-icon";
import { FloatingOverlay } from "@floating-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import View from "../View";
import Backdrop from "./Backdrop";
import Content from "./Content";
import { ModalProps } from "./Modal.types";

export function Modal({
  open,
  onClose,
  children,
  closeButton = true,
  className,
  ...props
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "unset";
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      <View.If visible={open}>
        <FloatingOverlay lockScroll style={{ zIndex: 999 }}>
          <Backdrop onClose={onClose}>
            <Content className={className} {...props}>
              {children}
              <View.If visible={closeButton}>
                <button
                  className="absolute right-20 top-10 z-50"
                  onClick={onClose}
                >
                  <ArrowBackCircleIcon color="#f0f0f0" />
                </button>
                <button>
                  <TrashIcon
                    className="absolute right-10 top-10 z-50"
                    color="#f0f0f0"
                  />
                </button>
              </View.If>
            </Content>
          </Backdrop>
        </FloatingOverlay>
      </View.If>
    </AnimatePresence>
  );
}

export default Modal;
