import { signInUser } from "api/users";
import { Button, Input } from "components"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/fonts.scss";
import "../../styles/index.scss";

const LoginPage = () => {
  // const userRef = useRef<any>();
  // const errRef = useRef<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   useRef.current.focus();
  // }, [])

  const signInData = {email, password}

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    signInUser(signInData);
    window.location.pathname = "/";
    localStorage.setItem("user", JSON.stringify(e.data));
    // } else {
    //   setEmail("");
    //   setPassword("");
    //   setErrorMessage("Please try again");
    //   return;
    // }
    // setSuccess(true);
  };

  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <section className="auth-section">
        <h1>Please sign in</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            placeholder="Your email"
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Button variant="primary" size="large">
            Sign in
          </Button>
        </form>
        <h3>
          Still don't have an account?
          <br />
          <Button
            variant="danger"
            size="small"
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </h3>
      </section>
    </div>
  );
};

export default LoginPage;
