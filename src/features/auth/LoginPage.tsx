import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input";
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

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    console.log(email, password);

    // setSuccess(true);
  };

  return (
    <section>
      <h1>Please sign in</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Your email:"
          type="email"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <Input
          label="Password:"
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
        <Button variant="danger" size="small">
          Sign up
        </Button>
      </h3>
    </section>
  );
};

export default LoginPage;
