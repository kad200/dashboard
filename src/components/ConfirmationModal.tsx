import Button from "./Button/Button";
import { Modal } from "./Modal";

interface ConfirmationModalProps {
  onClick: () => void;
  onAccept: () => void;
  open: boolean;
  title: string;
}

export const ConfirmationModal = ({
  onClick,
  onAccept,
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
