import $axios from "axios";
import { posts } from "./posts";
import { users } from "./users";

export const axios = $axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      "Content-type": "application/json",
    },
  });

export const api = {
  posts: posts,
  users: users
}