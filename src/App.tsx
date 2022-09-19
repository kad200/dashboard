import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./components/RouteTypes";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import UsersPage from "./features/users/pages/UsersPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<UsersPage />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
