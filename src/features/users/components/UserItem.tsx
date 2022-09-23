import { useState } from "react";
import Button from "../../../components/Button/Button";
import { Modal } from "../../../components/Modal";
import { UserProps } from "../../../types/userTypes";

const UserItem = ({ user }: { user: UserProps }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.email}</td>
      <td>{user.gender}</td>
      <td>{user.role}</td>
      <td>
        <Button
          variant="primary"
          size="small"
          onClick={() => setOpenEditModal(true)}
        >
          Edit
        </Button>
        {openEditModal && (
          <Modal onClick={() => setOpenEditModal(false)} open={true}></Modal>
        )}
        <Button
          variant="danger"
          size="small"
          onClick={() => setOpenRemoveModal(true)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default UserItem;
