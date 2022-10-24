import React from "react";
import "./TableContainer.scss";

export const TableContainer = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.TableHTMLAttributes<HTMLTableElement>>) => {
  return (
    <section className={`table ${className}`} {...props}>
      {children}
    </section>
  );
};
