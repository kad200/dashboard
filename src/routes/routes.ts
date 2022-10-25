import { NotFound, Unauthorized } from "components";
import { AddPostPage, Dashboard, LoginPage, PostsPage, RegisterPage, UsersPage } from "features";

export const routes = [
  {
    path: "login",
    element: LoginPage,
  },
  {
    path: "register",
    element: RegisterPage,
  },
  {
    path: "/unauthorized",
    element: Unauthorized,
  },
  {
    path: "/*",
    element: NotFound,
  },
];

export const authRoutes = [
  {
    path: "/",
    element: UsersPage,
  },
  {
    path: "posts",
    element: PostsPage,
  },
  {
    path: "/posts/create",
    element: AddPostPage,
  },
  {
    path: "/posts/:id/edit",
    element: AddPostPage,
  },
];
export const adminRoutes = [
  {
    path: "/dashboard",
    element: Dashboard,
  },
];

