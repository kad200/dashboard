import axios from "./index";
import { PostProps } from "types/types";


const getPosts = async () => {
  try {
    const response = await axios.get<PostProps[]>(`/posts`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPost = async (postId: number) => {
  try {
    const response = await axios.get<PostProps>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const addPost = async (post: PostProps) => {
  const response = await axios.post<PostProps>(`/posts`, post);
  console.log(post);
  return response.data;
};

const editPost = async (post: PostProps) => {
  const response = await axios.put(`/posts/${post.id}`, post);
  console.log(post);
  return response.data;
};


const deletePost = async (postId: number) => {
  const response = await axios.delete<PostProps>(`/posts/${postId}`);
  return response.data;
};

export { getPosts, getPost, deletePost, editPost, addPost };
