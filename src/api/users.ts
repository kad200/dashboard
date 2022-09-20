import axios from "axios";
import { UserProps } from "../types/UserTypes";

const getUsers = async () => {
  try {
    const response = await axios.get<UserProps[]>("http://localhost:3000/users");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (userId: string) => {
  try {
    const response = await axios.get<UserProps>(
      `http://localhost:3001/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getUsers, getUser };
