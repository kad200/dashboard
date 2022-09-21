export interface UserProps {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: "none" | "male" | "female";
  password?: string;
  role: "administrator" | "moderator";
}

export type UserLoginCredentials = Pick<UserProps, 'email' | 'password'>;

export type UserRegistrationParams = Omit<UserProps, 'id'>;
