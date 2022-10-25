import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "context/userContext";
import { UserProps } from "types/types";
import { Roles } from "types/enums";
import { Button, Modal, ConfirmationModal } from "components";
import { UserForm } from "features";
import { api } from "api";

export const UserItem = ({ user }: { user: UserProps }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const { id, role } = useUserContext();
  const queryClient = useQueryClient();

  const editUserMutation = useMutation(api.users.editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const deleteUserMutation = useMutation(api.users.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <div className="table__row" key={user.id}>
      <div className="table__cell table__cell-id">{user.id}</div>
      <div className="table__cell">{user.name}</div>
      <div className="table__cell">{user.surname}</div>
      <div className="table__cell table__cell-email">{user.email}</div>
      <div className="table__cell">
        <span className="table__cell-gender-full">{user.gender}</span>
        <span className="table__cell-gender-short">
          {user.gender.slice(0, 1).toUpperCase()}
        </span>
      </div>
      <div className="table__cell">
        <span className="table__cell-role-full">{user.role}</span>
        <span className="table__cell-role-short">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1, 3)}
        </span>
      </div>
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
                  onSubmit={(event) => {
                    event.preventDefault();
                    editUserMutation.mutate(user);
                  }}
                />
                <div>
                  <Button
                    type="submit"
                    form="form-user"
                    onClick={(event: React.SyntheticEvent) => {
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
                    onClick={(event: React.SyntheticEvent) => {
                      event.preventDefault();
                      deleteUserMutation.mutate(user.id);
                    }}
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