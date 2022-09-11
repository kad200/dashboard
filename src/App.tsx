import React from "react";
import "./App.css";
import Button from "./components/button/Button";

const App = () => {
  return (
    <div className="App">
      <h1>The very best dashboard</h1>
      <Button buttonStyle="btn--primary" buttonSize="btn--small" onClick={() => console.log("Push me")}>Sign me in!</Button>
      <br />
      <Button buttonStyle="btn--danger" buttonSize="btn--small" onClick={() => console.log("Let me go")}>Let me out!</Button>
      <br />
      <Button buttonStyle="btn--primary" buttonSize="btn--large" onClick={() => console.log("Push me")}>Sign me in!</Button>
      <br />
      <Button buttonStyle="btn--danger" buttonSize="btn--large" onClick={() => console.log("Let me go")}>Let me out!</Button>
      <br />
    </div>
  );
}

export default App;
