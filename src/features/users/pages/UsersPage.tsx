import UsersTable from "../components/UsersTable";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/users";

const UsersPage = () => {
  const { isError, isSuccess, data } = useQuery(["users"], getUsers);

  if (isError) {
    return <h1>An unknown error occured</h1>;
  }

  if (!data) {
    return <h1>There is nothing to show</h1>;
  }

  // if (isSuccess) {
    return <UsersTable users={data} />;
  // }
};

export default UsersPage;
