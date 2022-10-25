import "./Grid.scss";

interface GridProps {
  variant?: string;
  children: React.ReactNode;
}

export const Grid = ({ variant, children, ...props }: GridProps) => {
  return (
    <div
      className={`grid grid--${variant}`}
      {...props}
    >
      {children}
    </div>
  );
};
