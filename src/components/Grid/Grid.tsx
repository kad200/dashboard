import "./Grid.scss";

interface GridProps {
  columns: number;
  variant?: string;
  children: React.ReactNode;
}

export const Grid = ({
  variant,
  children,
  columns,
}: GridProps) => {
  return (
    <div
      className={`grid grid--${variant}`}
      style={{ gridTemplateColumns: "minmax(0, 1fr) ".repeat(columns) }}
    >
      {children}
    </div>
  );
};
