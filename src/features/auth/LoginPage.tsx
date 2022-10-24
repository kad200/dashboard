import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInUser } from "api/users";
import { Button, Input } from "components";

import "styles/fonts.scss";
import "styles/index.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInData = { email, password };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    signInUser(signInData);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <section className="auth-page__section">
        <div className="auth-page__section-header">
          <img src="logo.png" alt="logo" />
          <h1>Please sign in</h1>
        </div>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <Input
            placeholder="Enter your email"
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Input
            placeholder="Enter your password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Button variant="primary" size="large" children="Sign in" />
        </form>
        <h3>Still don't have an account?</h3>
        <Button
          variant="danger"
          size="small"
          onClick={() => navigate("/register")}
          children="Sign up"
        />
      </section>
    </div>
  );
};

export default LoginPage;
