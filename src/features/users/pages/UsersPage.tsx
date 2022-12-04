import { createContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Modal, Space, Button } from 'ebs-design';
import { useUserContext } from 'context/userContext';
import { Roles } from 'types/enums';
import { Layout, Loader } from 'components';
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
            // variant="danger"
            type="primary"
            size="small"
            onClick={() => {
              // event.stopPropagation();
              setOpenAddModal(true);
            }}
          />
          {openAddModal && (
            <Modal
              closeOnClickOutside
              mask
              open
              size="small"
              title="Add a new user"
              // onClick={() => setOpenAddModal(false)}
              // open={openAddModal}
            >
              <Modal.Content>
                <UserForm />
              </Modal.Content>
              <Modal.Footer>
                <Space justify="space-around">
                  <Button
                    onClick={() => {
                      setOpenAddModal(false);
                    }}
                    size="large"
                    children="Cancel"
                  />
                  <Button
                    submit
                    form="form-user"
                    size="large"
                    type="primary"
                    children="Save"
                  />
                </Space>
              </Modal.Footer>
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
