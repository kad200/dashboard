import { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserContext } from 'context/userContext';
import { Roles } from 'types/enums';
import { Icon } from 'ebs-design';
import { Layout, Button, Modal, Loader } from 'components';
import { UserForm, UsersTable } from 'features';
import { api } from 'api';

export const UsersContext = createContext({
  refetch: () => {},
});

export const UsersPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { role } = useUserContext();

  const { isError, isLoading, data, refetch } = useQuery(
    ['users'],
    api.users.getUsers,
  );

  if (isError) {
    return <h1>An unknown error occured</h1>;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Layout>
      {role === Roles.administrator ? (
        <div className="btn-container__add-user">
          <Button
            children="Add a new user"
            prefix={<Icon type="users" />}
            type="ghost"
            onClick={() => {
              // event.stopPropagation();
              setOpenAddModal(true);
            }}
          />
          {openAddModal && (
            <Modal
              title="Add a new user"
              onClick={() => setOpenAddModal(false)}
              open={openAddModal}
            >
              <UserForm />
              <div className="modal__content-buttons">
                <Button
                  onClick={() => {
                    // event.stopPropagation();
                    setOpenAddModal(false);
                  }}
                  children="Cancel"
                  type="primary"
                />
                <Button
                  type="ghost"
                  form="form-user"
                  onClick={() => {
                    // event.stopPropagation();
                  }}
                  children="Save"
                />
              </div>
            </Modal>
          )}
        </div>
      ) : null}
      <UsersContext.Provider value={{ refetch: refetch }}>
        <UsersTable users={data} />
      </UsersContext.Provider>
    </Layout>
  );
};
