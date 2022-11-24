import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from 'context/userContext';
import { UserProps } from 'types/types';
import { Roles } from 'types/enums';
import { Button, Modal, ConfirmationModal } from 'components';
import { UserForm } from 'features';
import { api } from 'api';

export const UserItemButtons = ({ user }: { user: UserProps }) => {
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
      // setOpenEditModal(false);
    },
  });

  return (
    <>
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
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenEditModal(false);
                  }}
                  variant={'danger'}
                  size={'small'}
                  children="Cancel"
                />
                <Button
                  type="submit"
                  form="form-user"
                  onClick={(event: React.SyntheticEvent) => {
                    event.stopPropagation();
                    editUserMutation.mutate(user);
                  }}
                  variant={'primary'}
                  size={'small'}
                  children="Save"
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
              title={`Do you really want to remove ${user.name} ${user.surname}?`}
              open
            >
              <div className="modal__content-buttons">
                <Button
                  onClick={() => setOpenRemoveModal(false)}
                  children={'Cancel'}
                  variant={'danger'}
                  size={'large'}
                />
                <Button
                  onClick={(event: React.SyntheticEvent) => {
                    event.preventDefault();
                    deleteUserMutation.mutate(user.id);
                  }}
                  children={'Delete'}
                  variant={'primary'}
                  size={'large'}
                />
              </div>
            </ConfirmationModal>
          )}
        </>
      ) : null}
    </>
  );
};
