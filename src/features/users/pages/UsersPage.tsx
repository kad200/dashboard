import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "api/users";
import { Layout, Button, Modal } from "components";
import { useUserContext } from "context/userContext";
import UsersTable from "../components/UsersTable";
import UserForm from "../components/UserForm";

export const UsersContext = React.createContext({
  refetch: () => {},
});

const UsersPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { role } = useUserContext();

  const { isError, data, refetch } = useQuery(["users"], getUsers);

  if (isError) {
    return <h1>An unknown error occured</h1>;
  }

  if (!data) {
    return <h1>Waiting for the information</h1>;
  }

  return (
    <Layout>
      {role === "administrator" ? (
        <div className="btn-container__add-user">
          <Button
            children="Add a new user"
            variant="danger"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
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
              <div>
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenAddModal(false);
                }}
                variant={"danger"}
                size={"small"}
                children="Cancel"
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

export default UsersPage;
