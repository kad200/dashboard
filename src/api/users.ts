import {
  UserProps,
  UserRegistrationParams,
  UserLoginCredentials,
} from "types/types";
import axios from "./index";

const getUser = async (id: number) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get<UserProps[]>(`/users`);
  return response.data;
};

const signUpUser = async (user: UserRegistrationParams) => {
  const response = await axios.get<UserRegistrationParams[]>(
    `/users?email=${user.email}`
  );
  if (response.data.length > 0) {
    alert(`An account with the email ${user.email} already exists`);
    throw new Error(`An account with the email ${user.email} already exists`);
  }
  return await axios.post<UserRegistrationParams>(`/users`, user);
};

const signInUser = async (UserLoginCredentials: UserLoginCredentials) => {
  const response = await axios.get<UserProps[]>(
    `/users?email=${UserLoginCredentials.email}&password=${UserLoginCredentials.password}`
  );

  if (response.data.length === 0) {
    alert("Please check your email or password!");
    throw new Error("Please check your email or password!");
  }
  const userId = JSON.stringify(response.data[0].id);
  localStorage.setItem("userId", userId);

  // const userRole = JSON.stringify(response.data[0].role);
  localStorage.setItem("userRole", response.data[0].role);

  window.location.replace("/");
  return response.data;
};

const editUser = async (user: UserProps) => {
  return await axios.patch(`/users/${user.id}`, user);
};

const deleteUser = async (userId: number) => {
  if (userId === Number(localStorage.getItem("userId"))) {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    window.location.reload();
  }
  return await axios.delete<UserProps>(`/users/${userId}`);
};

const logoutUser = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userRole");
  window.location.reload();
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
