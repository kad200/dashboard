// import NotFound from 'components/NotFound/NotFound';
import NotFound from 'components/NotFound/NotFound';
import LoginPage from 'features/auth/LoginPage';
import RegisterPage from 'features/auth/RegisterPage';
import AddPostPage from 'features/posts/pages/AddPostPage';
import PostsPage from 'features/posts/pages/PostsPage';
import UsersPage from 'features/users/pages/UsersPage';

const routes =  [
  {
    path: 'login',
    element: LoginPage
  },
  {
    path: 'register',
    element: RegisterPage
  },
  {
    path: '/',
    element: UsersPage
  },
  {
    path: 'posts',
    element: PostsPage,
  },
  {
    path: '/posts/create',
    element: AddPostPage,
  },
  {
    path: '/posts/:id/edit',
    element: AddPostPage,
  },
  // {
  //   path: '/dashboard',
  //   element: Dashboard
  // },
  {
    path: '/*',
    element: NotFound
  }
];

export default routes