import { useState } from "react";
import Button from "../../../components/Button/Button";
import { ConfirmationModal } from "../../../components/ConfirmationModal";
import { Modal } from "../../../components/Modal";
import { UserProps } from "../../../types/UserTypes";

import UserForm from "./UserForm";



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
        <div className="user-card__buttons">
          <Button variant="primary" size="small" onClick={() => setOpenEditModal(true)}>Edit</Button>
          <Button variant="danger" size="small" onClick={() => setOpenRemoveModal(true)}>
            Remove
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserItem