import "./Modal.scss";

interface ModalProps {
  title?: string;
  open: boolean;
  setOpen?: string;
  actions?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Modal = ({
  title,
  children,
  onClick,
}: React.PropsWithChildren<ModalProps>) => {
  return (
    <>
      <div className="modal-bg" onClick={onClick} />
      <div className="modal">
        <div className="modal__header">
          <h1 className="modal__header-title">{title}</h1>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </>
  );
};

