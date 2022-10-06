import NotFound from "components/NotFound/NotFound";
import Unauthorized from "components/Unauthorized/Unauthorized";
import LoginPage from "features/auth/LoginPage";
import RegisterPage from "features/auth/RegisterPage";
import Dashboard from "features/dashboard/Dashboard";
import AddPostPage from "features/posts/pages/AddPostPage";
import PostsPage from "features/posts/pages/PostsPage";
import UsersPage from "features/users/pages/UsersPage";

const routes = [
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

const authRoutes = [
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
  }]
  const adminRoutes = [
  {
    path: "/dashboard",
    element: Dashboard,
  },
];

export { routes, authRoutes, adminRoutes };
