import { signUpUser } from "api/users";
import { Button, Input, Select } from "components";
import useSetState from "hooks/useSetState";
import { UserProps } from "types/types";

interface UserFormProps {
  user?: UserProps;
  onSubmit: (e: any) => void;
}

const UserForm = ({ user }: UserFormProps) => {
  const [userForm, setUserForm] = useSetState(
    user
      ? {name: user.name,
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // console.log(
    //   userForm.name,
    //   userForm.surname,
    //   userForm.email,
    //   userForm.gender,
    //   userForm.role
    // );
    signUpUser({
      name: userForm.name,
      surname: userForm.surname,
      email: userForm.email,
      gender: userForm.gender,
      role: userForm.role,
      password: "default123"
    });

    setUserForm("");
    window.location.pathname = "/";

    // setSuccess(true);
    // navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <Button variant="primary" size="small">
        Save
      </Button>
      <Button variant="danger" size="small">
        Cancel
      </Button>
    </form>
  );
};

export default UserForm;
