import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

export default function Backdrop({
  children,
  className,
  onClose,
}: {
  children: ReactNode;
  className?: string;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <motion.div
      className={cn(
        "fixed top-0 right-0 bottom-0 left-0 flex z-[999] overflow-auto overflow-x-hidden items-center justify-center bg-black/60 backdrop-blur-[10px]",
        className
      )}
      tabIndex={-1}
      onClick={(e: MouseEvent<HTMLDivElement>) => onClose(e)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
