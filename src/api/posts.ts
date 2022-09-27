import axios from "./index";
import { PostProps } from "../types/types";


const getPosts = async () => {
  try {
    const response = await axios.get<PostProps[]>(`/posts`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getPosts };
