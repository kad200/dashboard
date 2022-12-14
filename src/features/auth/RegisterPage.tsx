import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Roles } from 'types/enums';
import { useSetState } from 'hooks';
import { Input, Select, Button, Loader, ConfirmationModal } from 'components';
import { api } from 'api';

import 'styles/fonts.scss';
import 'styles/index.scss';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

export const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useSetState({
    name: '',
    surname: '',
    email: '',
    gender: '',
    password: '',
    passwordConfirmation: '',
    errorMessage: '',
    processingConsent: false,
  });

  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordConfirmation, setValidPasswordConfirmation] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(registerForm.password));
    setValidPasswordConfirmation(
      registerForm.password === registerForm.passwordConfirmation,
    );
  }, [
    registerForm.password,
    registerForm.passwordConfirmation,
    setRegisterForm,
  ]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validPassword) {
      setErrorMessage('Invalid password');
      return;
    }
    if (!validPasswordConfirmation) {
      setErrorMessage('Invalid password confirmation');
      return;
    }
    signUpUserMutation.mutate();
  };

  const signUpUserMutation = useMutation(
    () =>
      api.users.signUpUser({
        name: registerForm.name,
        surname: registerForm.surname,
        email: registerForm.email,
        gender: registerForm.gender,
        role: Roles.moderator,
        password: registerForm.password,
      }),
    {
      onError: (error: Error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        queryClient.invalidateQueries();
        setRegisterForm('');
        navigate('/login');
      },
    },
  );

  return (
    <div className="auth-page">
      {signUpUserMutation.isLoading ? (
        <Loader />
      ) : (
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
              onChange={(e) => setRegisterForm({ name: e.target.value })}
              value={registerForm.name}
              required
            />
            <Input
              placeholder="Last name"
              type="text"
              id="lastName"
              autoComplete="off"
              onChange={(e) => setRegisterForm({ surname: e.target.value })}
              value={registerForm.surname}
              required
            />
            <Input
              placeholder="Email"
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setRegisterForm({ email: e.target.value })}
              value={registerForm.email}
              required
            />
            <Select
              label="Please set your gender:"
              placeholder="gender"
              id="gender"
              onChange={(e) => setRegisterForm({ gender: e.target.value })}
              value={registerForm.gender}
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
              onChange={(e) => setRegisterForm({ password: e.target.value })}
              value={registerForm.password}
              required
            />
            <Input
              placeholder="Password confirmation"
              type="password"
              id="password-confirmation"
              autoComplete="off"
              onChange={(e) =>
                setRegisterForm({ passwordConfirmation: e.target.value })
              }
              value={registerForm.passwordConfirmation}
              required
            />
            <Input
              label="I consent with personal data processing"
              type="checkbox"
              id="processing-confirmation"
              onChange={(e) =>
                setRegisterForm({
                  processingConsent: !registerForm.processingConsent,
                })
              }
              checked={registerForm.processingConsent}
              required
            />
            <Button children="Sign up" variant="danger" size="large" />
            {errorMessage && (
              <ConfirmationModal
                title={errorMessage}
                open={false}
                onClick={() => setErrorMessage('')}
              >
                <Button
                  children={'Try again'}
                  variant={'danger'}
                  size={'large'}
                  onClick={() => setErrorMessage('')}
                />
              </ConfirmationModal>
            )}
          </form>
        </section>
      )}
    </div>
  );
};
