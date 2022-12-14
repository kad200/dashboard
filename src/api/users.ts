import {
  UserProps,
  UserRegistrationParams,
  UserLoginCredentials,
} from 'types/types';
import { axios } from './index';

export const users = {
  getUser: async (id: number) => {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  },
  getUsers: async () => {
    const response = await axios.get<UserProps[]>(`/users`);
    return response.data;
  },
  signUpUser: async (user: UserRegistrationParams) => {
    const response = await axios.get<UserRegistrationParams[]>(
      `/users?email=${user.email}`,
    );
    if (response.data.length > 0) {
      throw new Error(`An account with the email ${user.email} already exists`);
    }
    return await axios.post<UserRegistrationParams>(`/users`, user);
  },
  signInUser: async (UserLoginCredentials: UserLoginCredentials) => {
    const response = await axios.get<UserProps[]>(
      `/users?email=${UserLoginCredentials.email}&password=${UserLoginCredentials.password}`,
    );

    if (response.data.length === 0) {
      throw new Error('Please check your credentials!');
    }
    const userId = JSON.stringify(response.data[0].id);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', response.data[0].role);

    window.location.replace('/');
    return response.data;
  },
  editUser: async (user: UserProps) => {
    return await axios.patch(`/users/${user.id}`, user);
  },
  deleteUser: async (userId: number) => {
    if (userId === Number(localStorage.getItem('userId'))) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      window.location.reload();
    }
    return await axios.delete<UserProps>(`/users/${userId}`);
  },
  logoutUser: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.reload();
  },
};
