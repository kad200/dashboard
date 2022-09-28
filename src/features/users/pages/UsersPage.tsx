import UsersTable from "../components/UsersTable";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/users";
import { useState } from "react";
import { Layout, Button, Modal } from "components";
import UserForm from "../components/UserForm";
import React from "react";

export const UsersContext = React.createContext({
  refetch: () => {},
});

const UsersPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { isError, isLoading, data, refetch } = useQuery(["users"], getUsers);

  if (isError) {
    return <h1>An unknown error occured</h1>;
  }

  // if (isLoading) {
  //   return <h1>Loading the information</h1>;
  // }

  if (!data) {
    return <h1>Waiting for the information</h1>;
  }

  return (
    <Layout>
      <div className="btn-container__add-user">
        <Button
          variant="danger"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            setOpenAddModal(true);
          }}
        >
          Add a new user
        </Button>
        {openAddModal && (
          <Modal
            title="Add a new user"
            onClick={() => setOpenAddModal(false)}
            open={openAddModal}
          >
            <UserForm
              onSubmit={() => {
                refetch();
                setOpenAddModal(false);
              }}
            />
          </Modal>
        )}
      </div>
      <UsersContext.Provider value={{ refetch: refetch }}>
        <UsersTable users={data} />;
      </UsersContext.Provider>
    </Layout>
  );
};

export default UsersPage;
