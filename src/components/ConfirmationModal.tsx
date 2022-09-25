import Button from "./Button/Button";
import Modal from "./Modal/Modal";

interface ConfirmationModalProps {
  onClick: () => void;
  open: boolean;
  title: string;
}

const ConfirmationModal = ({
  onClick,
  open,
  children,
  title,
}: React.PropsWithChildren<ConfirmationModalProps>) => {
  return (
    <Modal
      onClick={onClick}
      title={title}
      open={open}
      actions={
        <Button variant="danger" size="small" onClick={onClick}>
          Accept
        </Button>
      }
    >
      {children}
    </Modal>
  );
};

export default ConfirmationModal;
