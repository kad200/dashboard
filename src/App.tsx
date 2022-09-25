import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import { ProtectedRoutes, PublicRoutes } from "./features/auth/RouteTypes";
import PostsPage from "./features/posts/pages/PostsPage";
import UsersPage from "./features/users/pages/UsersPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}></Route>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
