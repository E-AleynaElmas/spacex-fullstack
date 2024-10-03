import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Content({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "md:w-[700px] lg:w-[900px] w-full h-full md:h-auto z-[999] relative flex flex-col shadow-2xl p-4 m-auto backdrop-brightness-75 md:rounded-lg dark:bg-dark bg-[#202D3F] dark:text-dark-text",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
