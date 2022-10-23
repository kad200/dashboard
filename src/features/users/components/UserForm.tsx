import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser, signUpUser } from "api/users";
import { Input, Select } from "components";
import useSetState from "hooks/useSetState";
import { UserProps } from "types/types";

interface UserFormProps {
  id?: string;
  user?: UserProps | null;
  onSubmit?: (e: React.SyntheticEvent<UserProps>) => void;
}

const UserForm = ({ user }: UserFormProps) => {
  const [userForm, setUserForm] = useSetState(
    user
      ? {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          gender: user.gender,
          role: user.role,
        }
      : {
          name: "",
          surname: "",
          email: "",
          gender: "none",
          role: "moderator",
        }
  );

  const queryClient = useQueryClient();
  const addUserMutation = useMutation(signUpUser, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const editUserMutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });


  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(userForm);
    user
      ? editUserMutation.mutate({
          id: userForm.id,
          name: userForm.name,
          surname: userForm.surname,
          email: userForm.email,
          gender: userForm.gender,
          role: userForm.role,
        })
      : addUserMutation.mutate({
          name: userForm.name,
          surname: userForm.surname,
          email: userForm.email,
          gender: userForm.gender,
          role: userForm.role,
          password: "Default123",
        });
    setUserForm("");
  };

  return (
    <form  id="form-user" onSubmit={handleSubmit}>
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
      {/* <Button variant="primary" size="small" children="Save" /> */}
    </form>
  );
};

export default UserForm;
