import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import useSetState from "../../../hooks/useSetState";
import { UserProps } from "../../../types/types";

interface UserFormProps {
  user?: UserProps;
}

const UserForm = ({ user }: UserFormProps) => {
  const [userForm, setUserForm] = useSetState(
    user
      ? user
      : {
          name: "",
          surname: "",
          email: "",
          gender: "none",
          role: "moderator",
        }
  );

  return (
    <form className="form">
      <Input
        id="name"
        placeholder="Name"
        value={userForm.name}
        onChange={(event) => setUserForm({ name: event.target.value })}
      />
      <Input
        id="surname"
        placeholder="Surname"
        value={userForm.surname}
        onChange={(event) => setUserForm({ surname: event.target.value })}
      />
      <Input
        id="email"
        placeholder="Email address"
        value={userForm.email}
        onChange={(event) => setUserForm({ email: event.target.value })}
        type="email"
      />
      <Select
        id="gender"
        label="Gender"
        value={userForm.gender}
        onChange={(event) => setUserForm({ gender: event.target.value })}
      >
        <option value="">None</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
      <Select
        id="role"
        label="Role"
        value={userForm.role}
        onChange={(event) => setUserForm({ role: event.target.value })}
      >
        <option value="moderator">Moderator</option>
        <option value="administrator">Administrator</option>
      </Select>
    </form>
  );
};

export default UserForm;
