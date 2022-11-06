import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetState } from 'hooks';
import { UserProps } from 'types/types';
import { Button, ConfirmationModal, Input, Select } from 'components';
import { api } from 'api';
import { useState } from 'react';

interface UserFormProps {
  id?: string;
  user?: UserProps | null;
  onSubmit?: (e: React.SyntheticEvent<UserProps>) => void;
}

export const UserForm = ({ user }: UserFormProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [userForm, setUserForm] = useSetState(
    user
      ? {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          gender: user.gender,
          role: user.role,
        }
      : {
          name: '',
          surname: '',
          email: '',
          gender: 'none',
          role: 'moderator',
        },
  );

  const queryClient = useQueryClient();
  const addUserMutation = useMutation(api.users.signUpUser, {
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
    onSuccess: () => {
      setUserForm({
        name: '',
        surname: '',
        email: '',
        gender: 'none',
        role: 'moderator',
      });
      queryClient.invalidateQueries();
    },
  });

  const editUserMutation = useMutation(api.users.editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const userData = {
      name: userForm.name,
      surname: userForm.surname,
      email: userForm.email,
      gender: userForm.gender,
      role: userForm.role,
    };
    user
      ? editUserMutation.mutate({
          id: userForm.id,
          ...userData,
        })
      : addUserMutation.mutate({
          password: 'Default123',
          ...userData,
        });
  };

  return (
    <form id="form-user" onSubmit={handleSubmit}>
      <Input
        id="name"
        placeholder="Name"
        value={userForm.name}
        onChange={(event) => setUserForm({ name: event.target.value })}
        required
      />
      <Input
        id="surname"
        placeholder="Surname"
        value={userForm.surname}
        onChange={(event) => setUserForm({ surname: event.target.value })}
        required
      />
      <Input
        id="email"
        placeholder="Email address"
        value={userForm.email}
        onChange={(event) => setUserForm({ email: event.target.value })}
        type="email"
        required
      />
      <Select
        id="gender"
        label="Gender"
        value={userForm.gender}
        onChange={(event) => setUserForm({ gender: event.target.value })}
        required
      >
        <option value="">None</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
      <Select
        id="role"
        label="Role"
        value={userForm.role}
        onChange={(event) => setUserForm({ role: event.target.value })}
      >
        <option value="moderator">Moderator</option>
        <option value="administrator">Administrator</option>
      </Select>
      {errorMessage && (
        <ConfirmationModal
          title={errorMessage}
          open={false}
          onClick={() => setErrorMessage('')}
        >
          <Button
            children={'Try again'}
            variant={'danger'}
            size={'large'}
            onClick={() => setErrorMessage('')}
          />
        </ConfirmationModal>
      )}
    </form>
  );
};
