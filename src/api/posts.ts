import axios from "axios";
import { PostProps } from "../types/types";

const URL = "http://localhost:3000";

const getPosts = async () => {
  try {
    const response = await axios.get<PostProps[]>(`${URL}/posts`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getPosts };
