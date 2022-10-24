import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, editUser } from "api/users";
import { useUserContext } from "context/userContext";
import { UserProps } from "types/types";
import { Roles } from "types/enums";
import { Button, Modal, ConfirmationModal } from "components";
import UserForm from "./UserForm";

const UserItem = ({ user }: { user: UserProps }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const { id, role } = useUserContext();

  const queryClient = useQueryClient();

  const editUserMutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    deleteUserMutation.mutate(user.id);
    setOpenRemoveModal(false);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    editUserMutation.mutate(user);
    // setOpenEditModal(false);
  };

  return (
    <div className="table__row" key={user.id}>
      <div className="table__cell table__cell-id">{user.id}</div>
      <div className="table__cell">{user.name}</div>
      <div className="table__cell">{user.surname}</div>
      <div className="table__cell table__cell-email">{user.email}</div>
      <div className="table__cell">{user.gender}</div>
      <div className="table__cell">{user.role}</div>
      <div className="table__cell action-buttons">
        {role === Roles.administrator || id === user.id ? (
          <>
            <Button
              variant="primary"
              size="small"
              onClick={() => setOpenEditModal(true)}
              children="Edit"
            />
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
                  }}
                />
                <div>
                  <Button
                    type="submit"
                    form="form-user"
                    onClick={(event) => {
                      event.stopPropagation();
                      // setOpenEditModal(false);
                    }}
                    variant={"primary"}
                    size={"small"}
                    children="Save"
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
                </div>
              </Modal>
            )}
            <Button
              variant="danger"
              size="small"
              onClick={() => setOpenRemoveModal(true)}
              children="Remove"
            />
            {openRemoveModal && (
              <ConfirmationModal
                onClick={() => setOpenRemoveModal(false)}
                title="Do you really want to delete this user?"
                open
              >
                <div>
                  <Button
                    onClick={() => setOpenRemoveModal(false)}
                    children={"Cancel"}
                    variant={"primary"}
                    size={"large"}
                  />
                  <Button
                    onClick={handleDelete}
                    children={"Delete user"}
                    variant={"danger"}
                    size={"large"}
                  />
                </div>
              </ConfirmationModal>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UserItem;
