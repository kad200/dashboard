import { Modal } from "components";

interface ConfirmationModalProps {
  onClick: () => void;
  open: boolean;
  title: string;
}

export const ConfirmationModal = ({
  onClick,
  open,
  children,
  title,
  ...props
}: React.PropsWithChildren<ConfirmationModalProps>) => {
  return (
    <Modal onClick={onClick} title={title} open={open} {...props}>
      {children}
    </Modal>
  );
};
