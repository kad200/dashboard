import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import "../../styles/fonts.scss";
import "../../styles/index.scss";

const RegisterPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [processingConsent, setProcessingConsent] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(firstName, lastName, gender, password, passwordConfirmation, processingConsent);
    setFirstName("");
    setLastName("");
    setGender("");
    setPassword("");
    setPasswordConfirmation("");
    setProcessingConsent(false);
    // setSuccess(true);
  };

  return (
    <section>
      <h1>Sign up form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="FirstName:"
          type="text"
          id="firstName"
          autoComplete="off"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        />
        <Input
          label="LastName:"
          type="text"
          id="lastName"
          autoComplete="off"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />
        {/* <Select
          label="Your gender:"
          id="gender"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          required
        /> */}
        <Input
          label="Password:"
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <Input
          label="Password confirmation:"
          type="password"
          id="password-confirmation"
          autoComplete="off"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          required
        />
        <Input
          label="I consent to the processing of the personal data"
          type="checkbox"
          id="processing-confirmation"
          onChange={(e) => setProcessingConsent(!processingConsent)}
          checked={processingConsent}
        />
        <Button variant="danger" size="large">
          Sign up
        </Button>
      </form>
    </section>
  );
};

export default RegisterPage;
