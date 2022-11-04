import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "context/userContext";
import { Roles } from "types/enums";
import { Layout, Button, Modal, Loader } from "components";
import { UserForm, UsersTable } from "features";
import { api } from "api";

export const UsersContext = createContext({
  refetch: () => {},
});

export const UsersPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { role } = useUserContext();

  const { isError, isLoading, data, refetch } = useQuery(["users"], api.users.getUsers);

  if (isError) {
    return <h1>An unknown error occured</h1>;
  } else if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Layout>
        {role === Roles.administrator ? (
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
                <div className="modal__content-buttons">
                  <Button
                    type="submit"
                    form="form-user"
                    onClick={(event) => {
                      event.stopPropagation();
                      // setOpenAddModal(false);
                    }}
                    variant={"primary"}
                    size={"small"}
                    children="Save"
                  />
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
  }
};