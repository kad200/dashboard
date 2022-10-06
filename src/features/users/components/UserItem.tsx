import { deleteUser, editUser, getUser } from "api/users";
import { Button, Modal, ConfirmationModal } from "components";
import { useState } from "react";
import { UserProps } from "types/types";
import UserForm from "./UserForm";

const UserItem = ({ user }: { user: UserProps }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    deleteUser(user.id);
    window.location.pathname = "/";
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    editUser(user);
    window.location.pathname = "/";
  };

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
          <Modal
            onClick={() => {
              setOpenEditModal(false);
            }}
            title={`Edit ${user.name} ${user.surname} data`}
            open
          >
            <UserForm
              user={user}
              onSubmit={() => {
                handleEdit(user);
                setOpenEditModal(false);
              }}
            />
            <Button
              onClick={(event) => {
                event.stopPropagation();
                setOpenEditModal(false);
              }}
              variant={"danger"}
              size={"small"}
              children="Cancel"
            />
          </Modal>
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
            title="Do you really want to delete this user?"
            open
          >
            <Button
              onClick={handleDelete}
              children={"Delete user"}
              variant={"danger"}
              size={"large"}
            />
          </ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default UserItem;
