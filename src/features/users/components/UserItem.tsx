  // import { useState } from "react";
import Button from "../../../components/Button/Button";
import { UserProps } from "../../../types/UserTypes";

const UserItem = ({ user }: { user: UserProps }) => {
  // const [openEditModal, setOpenEditModal] = useState(false);
  // const [openRemoveModal, setOpenRemoveModal] = useState(false);

  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.email}</td>
      <td>{user.gender}</td>
      <td>{user.role}</td>
      <td className="table__action-buttons">
          <Button
            variant="primary"
            size="small"
            // onClick={() => setOpenEditModal(true)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="small"
            // onClick={() => setOpenRemoveModal(true)}
          >
            Remove
          </Button>
      </td>
    </tr>
  );
};

export default UserItem;
