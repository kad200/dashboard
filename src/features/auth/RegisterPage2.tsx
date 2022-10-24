import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers, signUpUser } from "api/users";
import { Input, Select, Button } from "components";

import "styles/fonts.scss";
import "styles/index.scss";
import { Roles } from "types/enums";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validPasswordConfirmation, setValidPasswordConfirmation] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [processingConsent, setProcessingConsent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidPasswordConfirmation(password === passwordConfirmation);
  }, [password, passwordConfirmation]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, passwordConfirmation]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validPassword || !validPasswordConfirmation) {
      setErrorMessage("Invalid password");
      alert(errorMessage);
      return;
    }

    signUpUser({
      name,
      surname,
      email,
      gender: gender,
      role: Roles.moderator,
      password,
    });
    getUsers();

    setName("");
    setSurname("");
    setEmail("");
    setGender("");
    setPassword("");
    setPasswordConfirmation("");
    setProcessingConsent(false);
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <section className="auth-page__section">
        <div className="auth-page__section-header">
          <img src="logo.png" width="300px" alt="logo" />
          <h1>Sign up form</h1>
        </div>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <Input
            placeholder="First name"
            type="text"
            id="firstName"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <Input
            placeholder="Last name"
            type="text"
            id="lastName"
            autoComplete="off"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Select
            label="Please set your gender:"
            placeholder="gender"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            required
          >
            <option defaultValue="none">None</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
          <Input
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Input
            placeholder="Password confirmation"
            type="password"
            id="password-confirmation"
            autoComplete="off"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            required
          />
          <Input
            label="I consent with personal data processing"
            type="checkbox"
            id="processing-confirmation"
            onChange={(e) => setProcessingConsent(!processingConsent)}
            checked={processingConsent}
            required
          />
          <Button children="Sign up" variant="danger" size="large" />
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
