import Button from "./Button/Button";

interface ModalProps {
  title?: string;
  open: boolean;
  setOpen?: string;
  actions?: React.ReactNode;
  onClick: () => void;
}

export const Modal = ({
  title,
  children,
  actions,
  onClick,
}: React.PropsWithChildren<ModalProps>) => {
  return (
    <div
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        onClick();
      }}
    >
      <div className="modal">
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
        </div>
        <div className="modal__content">{children}</div>
        <div className="modal__footer">
          {actions}
          <Button size="small" onClick={onClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
