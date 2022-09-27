import { Button, Modal, ConfirmationModal } from "components";
import { useState } from "react";
import { UserProps } from "../../../types/types";

const UserItem = ({ user }: { user: UserProps }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  return (
    <div className="table__row" key={user.id}>
      <div className="table__cell">{user.id}</div>
      <div className="table__cell">{user.name}</div>
      <div className="table__cell">{user.surname}</div>
      <div className="table__cell table__cell-email">{user.email}</div>
      <div className="table__cell">{user.gender}</div>
      <div className="table__cell">{user.role}</div>
      <div className="table__cell action-buttons">
        <Button
          variant="primary"
          size="small"
          onClick={() => setOpenEditModal(true)}
        >
          Edit
        </Button>
        {openEditModal && (
          <Modal onClick={() => setOpenEditModal(false)} open={true}></Modal>
        )}
        <Button
          variant="danger"
          size="small"
          onClick={() => setOpenRemoveModal(true)}
        >
          Remove
        </Button>
        {openRemoveModal && (
          <ConfirmationModal
            onClick={() => setOpenRemoveModal(false)}
            title=""
            open={true}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default UserItem;
