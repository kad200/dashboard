export interface UserProps {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: "none" | "male" | "female";
  password?: string;
  role: "administrator" | "moderator";
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}
