import axios from "./index";
import {
  UserProps,
  UserRegistrationParams,
  UserLoginCredentials,
} from "../types/types";
import { useNavigate } from "react-router-dom";

const getUsers = () => axios.get("/users").then((res) => res.data);

const getUser = (id: number) =>
  axios.get(`/users/${id}`).then((res) => res.data);

// const editUser = (id: number , { ...editedUser }) =>
//   axios.put(`/users/${id}`, editedUser).then((res) => res.data);

// const getUsers = async () => {
//   try {
//     const response = await axios.get<UserProps[]>(`/users`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getUser = async (userId: number) => {
//   try {
//     const response = await axios.get<UserProps>(`/users/${userId}`);
//     // console.log(response.data);

//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

const signUpUser = async (user: UserRegistrationParams) => {
  const response = await axios.get<UserRegistrationParams[]>(
    `/users?email=${user.email}`
  );
  if (response.data.length > 0) {
    alert(`An account with the email ${user.email} already exists`);
    throw new Error(`An account with the email ${user.email} already exists`);
  }
  const register = await axios.post<UserRegistrationParams>(`/users`, user);
  return register.data;
};

const signInUser = async (UserLoginCredentials: UserLoginCredentials) => {
  const response = await axios.get<UserProps[]>(
    `/users?email=${UserLoginCredentials.email}&password=${UserLoginCredentials.password}`
  );

  if (response.data.length === 0) {
    throw new Error("Please check your email or password!");
  }
  const data = JSON.stringify(response.data[0].id);
    console.log(data)
    localStorage.setItem("userId", data);

  return response.data;
};

const editUser = async (user: UserProps) => {
  const response = await axios.put(`/users/${user.id}`, user);
  console.log(user);
  return response.data;
};

const deleteUser = async (userId: number) => {
  const response = await axios.delete<UserProps>(`/users/${userId}`);
  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem("userId");
};

export {
  getUsers,
  getUser,
  signUpUser,
  signInUser,
  editUser,
  deleteUser,
  logoutUser,
};
