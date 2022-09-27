import React from 'react'
import "./Table.scss"

export const Table = ({
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

