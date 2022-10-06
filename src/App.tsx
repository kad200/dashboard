import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "routes";


const App = () => {
  return (

    <div className="App">
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </Router>
    </div>

  );
};

export default App;