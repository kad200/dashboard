import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Select, Modal, Space } from 'ebs-design';
import { useSetState } from 'hooks';
import { UserProps } from 'types/types';
import { Button, ConfirmationModal } from 'components';
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
    // <form id="form-user" onSubmit={handleSubmit}>
    <Form onFinish={handleSubmit} className="form">
      <Form.Field
        initialValue={userForm.name}
        name="name"
        label="Name"
        hideLabel
        rules={[
          {
            required: true,
            // warningOnly: true,
          },
        ]}
      >
        <Input
          type="name"
          placeholder="Name"
          // value={userForm.name}
          // onChange={(event) => setUserForm({ name: event.target.value })}
          size="small"
        />
      </Form.Field>
      <Form.Field
        initialValue={userForm.surname}
        name="name"
        label="Name"
        hideLabel
        rules={[
          {
            required: true,
            // warningOnly: true,
          },
        ]}
      >
        <Input
          type="surname"
          placeholder="Surname"
          // value={userForm.name}
          // onChange={(event) => setUserForm({ name: event.target.value })}
          size="small"
        />
      </Form.Field>
      <Form.Field
        initialValue={userForm.email}
        name="email"
        label="Email"
        hideLabel
        rules={[{ required: true }]}
      >
        <Input type="email" placeholder="Email" size="small" />
      </Form.Field>
      <Form.Field
        initialValue={userForm.gender}
        name="gender"
        label="Gender"
        hideLabel
        rules={[
          {
            required: true,
            // warningOnly: true,
          },
        ]}
      >
        <Select
          label="Gender"
          // initialValue={userForm.gender}
          // onChange={(event) => setUserForm({ gender: event.target.value })}
          options={[
            { value: '"', text: 'None' },
            { value: 'male', text: 'Male' },
            { value: 'female', text: 'Female' },
          ]}
        />
      </Form.Field>
      <Form.Field
        initialValue={userForm.role}
        name="role"
        label="Role"
        hideLabel
        rules={[
          {
            required: true,
            // warningOnly: true,
          },
        ]}
      >
        <Select
          label="Role"
          // onChange={(event) => setUserForm({ role: event.target.value })}
          options={[
            { value: 'moderator', text: 'Moderator' },
            { value: 'administrator', text: 'Administrator' },
          ]}
        />
      </Form.Field>
      {errorMessage && (
        <Modal
          closeOnClickOutside
          mask
          open
          size="small"
          // title=""
          // onClick={() => setOpenAddModal(false)}
          // open={openAddModal}
        >
          <Modal.Content>{errorMessage}</Modal.Content>
          <Modal.Footer>
            <Space justify="space-around">
              <Button
                // onClick={() => {
                //   setOpenEditModal(false);
                // }}
                size="large"
                children="Cancel"
                variant={'primary'}
              />
              <Button
                // submit
                form="form-user"
                size="large"
                // type="primary"
                children="Save" variant={'primary'}              />
            </Space>
          </Modal.Footer>
        </Modal>
        // <ConfirmationModal
        //   title={errorMessage}
        //   open={false}
        //   onClick={() => setErrorMessage('')}
        // >
        //   <Button
        //     children={'Try again'}
        //     variant={'danger'}
        //     size={'large'}
        //     onClick={() => setErrorMessage('')}
        //   />
        // </ConfirmationModal>
      )}
    </Form>
  );
};
