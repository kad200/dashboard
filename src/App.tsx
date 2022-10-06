import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes, authRoutes, adminRoutes } from "routes/routes";
import { AuthorizedRoutes } from "routes/routeTypes";

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
                allowedRoles={['"moderator"', '"administrator"']}
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
            element={<AuthorizedRoutes allowedRoles={['"administrator"']} />}
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
