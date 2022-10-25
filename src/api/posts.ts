import { PostProps } from "types/types";
import { axios } from "./index";

export const posts = {
  getPosts: async () => {
    const response = await axios.get<PostProps[]>(`/posts`);
    return response.data;
  },
  getPost: async (postId: number) => {
    const response = await axios.get<PostProps>(`/posts/${postId}`);
    return response.data;
  },
  addPost: async (post: PostProps) => {
    return await axios.post<PostProps>(`/posts`, post);
  },
  editPost: async (post: PostProps) => {
    return await axios.put(`/posts/${post.id}`, post);
  },
  deletePost: async (postId: number) => {
    return await axios.delete<PostProps>(`/posts/${postId}`);
  },
};