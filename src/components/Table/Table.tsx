import React from 'react'
import "./Table.scss"

const Table = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.TableHTMLAttributes<HTMLTableElement>>) => {
  return (
    <table className={`table ${className}`} {...props}>
      {children}
    </table>
  );
};

export default Table