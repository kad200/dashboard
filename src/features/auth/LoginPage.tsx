import { useRef, useState, useEffect } from "react";
import Button from "../../components/button/Button";
import "../../styles/Fonts.css";

const LoginPage = () => {
  const userRef = useRef<any>();
  // const errRef = useRef<any>();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   useRef.current.focus();
  // }, [])

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(user, password);
    setUser('');
    setPassword('');
    // setSuccess(true);
  }

  return (
    <section>
      <h1>Please sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <Button
          variant="btn--primary"
          size="btn--large"
        >
          Sign in
        </Button>
      </form>
      <h3>
        Still don't have an account?
        <Button
          variant="btn--danger"
          size="btn--small"
        >
          Sign up
        </Button>
      </h3>
    </section>
  );
};

export default LoginPage;
