import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ConfirmationModal, Input, Loader } from 'components';
import { api } from 'api';

import 'styles/fonts.scss';
import 'styles/index.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const signInData = { email, password };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    signInUserMutation.mutate();
  };

  const signInUserMutation = useMutation(
    () => api.users.signInUser(signInData),
    {
      onError: (error: Error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        navigate('/');
        queryClient.invalidateQueries();
      },
    },
  );

  return (
    <div className="auth-page">
      {signInUserMutation.isLoading ? (
        <Loader />
      ) : (
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
            onClick={() => navigate('/register')}
            children="Sign up"
          />
        </section>
      )}
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
    </div>
  );
};
