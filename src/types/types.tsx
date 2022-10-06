export interface UserProps {
  id: number;
  name: string;
  surname: string;
  email: string;
  // gender: "none" | "male" | "female";
  gender: string;
  password?: string;
  role: "administrator" | "moderator";
}

export type UserLoginCredentials = Pick<UserProps, "email" | "password">;

export type UserRegistrationParams = Omit<UserProps, "id">;

export interface PostProps {
  id?: number;
  title: string;
  content: string;
  imageURL: string;
  date: string;
  author: Author;
}

export type Author = Pick<UserProps, "id" | "name" | "surname">;