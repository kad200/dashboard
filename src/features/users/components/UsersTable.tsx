import { UserProps } from "types/types";
import { TableContainer } from "components";
import { UserItem } from "./UserItem";
import "./UsersTable.scss";


interface UsersTableProps {
  users: UserProps[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <TableContainer className="table-container">
      <div className="table-header table__row">
        <div className="table__cell header-cell table__cell-id">ID</div>
        <div className="table__cell header-cell">Name</div>
        <div className="table__cell header-cell">Surname</div>
        <div className="table__cell header-cell table__cell-email">Email</div>
        <div className="table__cell header-cell">Gender</div>
        <div className="table__cell header-cell">Role</div>
        <div className="table__cell header-cell action-buttons">Actions</div>
      </div>
      <div>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </TableContainer>
  );
};
