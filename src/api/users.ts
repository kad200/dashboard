import axios from "axios";
import {
  UserProps,
  UserRegistrationParams,
  UserLoginCredentials,
} from "../types/userTypes";

const URL = "http://localhost:3000";

const getUsers = async () => {
  try {
    const response = await axios.get<UserProps[]>(`${URL}/users`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (userId: string) => {
  try {
    const response = await axios.get<UserProps>(`${URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const signUpUser = async (user: UserRegistrationParams) => {
  try {
    await axios.get<UserRegistrationParams[]>(
      `${URL}/users?email=${user.email}`
    );
    if (user.email) {
      throw new Error(`An account with the email ${user.email} already exists`);
    }
    const register = await axios.post<UserProps>(`${URL}/users`, user);
    return register.data;
  } catch (error) {
    throw error;
  }
};

const signInUser = async (user: UserLoginCredentials) => {};

export { getUsers, getUser, signUpUser, signInUser };
