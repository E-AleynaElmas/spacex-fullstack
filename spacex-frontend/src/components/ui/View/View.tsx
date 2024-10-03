import { Children } from "react";
import { AnimatePresence } from "framer-motion";
import type { ViewProps, ViewIfElseProps } from "./View.types";

function View({ viewIf, children }: ViewProps) {
  if (Children.count(children) !== 2)
    throw new Error(
      "View component can only have 2 children, View.If and View.Else"
    );
  return (
    <AnimatePresence>
      {viewIf === true && Children.toArray(children)[0]}
      {viewIf === false && Children.toArray(children)[1]}
    </AnimatePresence>
  );
}

function ViewIf({ children, hidden = null, visible = null }: ViewIfElseProps) {
  return (
    <AnimatePresence>
      {hidden == null && visible == null && children}
      {hidden === false && children}
      {visible === true && children}
    </AnimatePresence>
  );
}

View.If = ViewIf;
View.Else = ViewIf;

export default View;
