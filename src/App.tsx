import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes, authRoutes, adminRoutes } from "routes/routes";
import { AuthorizedRoutes } from "routes/routeTypes";
import { Roles } from "types/enums";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route: any) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}

          <Route
            element={
              <AuthorizedRoutes
                allowedRoles={[Roles.administrator, Roles.moderator]}
              />
            }
          >
            {authRoutes.map((route: any) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route
            element={<AuthorizedRoutes allowedRoles={[Roles.administrator]} />}
          >
            {adminRoutes.map((route: any) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
