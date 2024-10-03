import type { ReactNode } from "react";

export interface ViewProps {
  viewIf?: boolean;
  children?: ReactNode;
}

export interface ViewIfElseProps {
  children: ReactNode;
  hidden?: boolean | null;
  visible?: boolean | null;
}
