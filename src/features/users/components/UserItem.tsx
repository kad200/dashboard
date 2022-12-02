import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from 'context/userContext';
import { UserProps } from 'types/types';
import { Roles } from 'types/enums';
import { Button, Modal, ConfirmationModal } from 'components';
import { UserForm } from 'features';
import { api } from 'api';

export const UserItem = ({ user }: { user: UserProps }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const { id, role } = useUserContext();
  const queryClient = useQueryClient();

  const editUserMutation = useMutation(api.users.editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      setOpenEditModal(false);
    },
  });

  const deleteUserMutation = useMutation(api.users.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  return (
    <div className="table__row" key={user.id}>
      <div className="table__cell table__cell-id">
        <span>{user.id}</span>
      </div>
      <div className="table__cell">
        <span>{user.name}</span>
      </div>
      <div className="table__cell">
        <span>{user.surname}</span>
      </div>
      <div className="table__cell table__cell-email">
        <div>{user.email}</div>
      </div>
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
              type="primary"
              onClick={() => setOpenEditModal(true)}
              children="Edit"
            />
            {openEditModal && (
              <Modal
                onClick={(event) => {
                  event.preventDefault();
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
                <div className="modal__content-buttons">
                  <Button
                    onClick={() => {
                      // event.stopPropagation();
                      setOpenEditModal(false);
                    }}
                    children="Cancel"
                  />
                  <Button
                    type="primary"
                    form="form-user"
                    onClick={() => {
                      // event.stopPropagation();
                      editUserMutation.mutate(user);
                    }}
                    children="Save"
                  />
                </div>
              </Modal>
            )}
            <Button
              onClick={() => setOpenRemoveModal(true)}
              children="Remove"
            />
            {openRemoveModal && (
              <ConfirmationModal
                onClick={() => setOpenRemoveModal(false)}
                title={`Do you really want to remove ${user.name} ${user.surname}?`}
                open
              >
                <div className="modal__content-buttons">
                  <Button
                    onClick={() => setOpenRemoveModal(false)}
                    children="Cancel"
                  />
                  <Button
                    onClick={() => {
                      // event.preventDefault();
                      deleteUserMutation.mutate(user.id);
                    }}
                    children="Delete"
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
