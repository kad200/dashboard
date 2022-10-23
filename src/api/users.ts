import axios from "./index";
import {
  UserProps,
  UserRegistrationParams,
  UserLoginCredentials,
} from "types/types";

// const getUsers = () => axios.get<UserProps[]>("/users").then((res) => res.data);

// const getUser1 = (id: number) =>
//   axios.get(`/users/${id}`).then((res) => res.data);

const getUser = async (id: number) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
}

// const editUser = (id: number , { ...editedUser }) =>
//   axios.put(`/users/${id}`, editedUser).then((res) => res.data);

const getUsers = async () => {
    const response = await axios.get<UserProps[]>(`/users`);
    return response.data;
};

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
  return await axios.post<UserRegistrationParams>(`/users`, user);
  // return register.data;
};

const signInUser = async (UserLoginCredentials: UserLoginCredentials) => {
  const response = await axios.get<UserProps[]>(
    `/users?email=${UserLoginCredentials.email}&password=${UserLoginCredentials.password}`
  );

  if (response.data.length === 0) {
    throw new Error("Please check your email or password!");
  }
  const userId = JSON.stringify(response.data[0].id);
  localStorage.setItem("userId", userId);

  const userRole = JSON.stringify(response.data[0].role);
  localStorage.setItem("userRole", userRole);

  window.location.replace("/");
  return response.data;
};

const editUser = async (user: UserProps) => {
  return await axios.patch(`/users/${user.id}`, user);
};

const deleteUser = async (userId: number) => {
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
