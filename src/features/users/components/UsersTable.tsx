import Table from "../../../components/Table/Table";
import { UserProps } from "../../../types/UserTypes";
import UserItem from "./UserItem";

interface UsersTableProps {
  users: UserProps[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Role</th>
          <th className="table-header__action-buttons">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
