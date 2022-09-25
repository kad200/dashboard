import Button from "../Button/Button";
import "./Modal.scss";

interface ModalProps {
  title?: string;
  open: boolean;
  setOpen?: string;
  actions?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Modal = ({
  title,
  children,
  onClick,
}: React.PropsWithChildren<ModalProps>) => {
  return (
    <>
      <div className="modal-bg" onClick={onClick} />
      <div className="modal">
        <div className="modal__header">
          <h3 className="modal__header-title">{title}</h3>
        </div>
        <div className="modal__content">{children}</div>
        <div className="modal__buttons">
          <Button variant="primary" size="small" onClick={onClick}>
            Save
          </Button>
          <Button variant="danger" size="small" onClick={onClick}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
