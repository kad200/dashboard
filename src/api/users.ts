import axios from "./index";
import {
  UserProps,
  UserRegistrationParams,
  UserLoginCredentials,
} from "../types/types";

const getUsers = async () => {
  try {
    const response = await axios.get<UserProps[]>(`/users`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (userId: string) => {
  try {
    const response = await axios.get<UserProps>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const signUpUser = async (user: UserRegistrationParams) => {
  try {
    // const response = await axios.post(
    //   URL,
    //   JSON.stringify({      firstname,
    //     lastname,
    //     email,
    //     gender,
    //     password,})
    // )
    //   }}

    const response = await axios.get<UserRegistrationParams[]>(
      `/users?email=${user.email}`
    );
    if (response.data.length > 0) {
      throw new Error(`An account with the email ${user.email} already exists`);
    }
    const register = await axios.post<UserProps>(`/users`, user);
    return register.data;
  } catch (error) {
    throw error;
  }
};

// const signInUser = async (user: UserLoginCredentials) => {};

const signInUser = async (UserLoginCredentials: UserLoginCredentials) => {
  const response = await axios.get<UserLoginCredentials[]>(
    `/users?email=${UserLoginCredentials.email}&password=${UserLoginCredentials.password}`
  );

  if (response.data.length === 0) {
    throw new Error("Please check your email or password!");
  }

  return response.data;
};

export { getUsers, getUser, signUpUser, signInUser };
