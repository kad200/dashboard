import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'ebs-design';

import { ConfirmationModal, Loader } from 'components';
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
    // e.preventDefault();
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
          <Form onFinish={handleSubmit}
          className="form">
            <Form.Field
              initialValue=""
              name="email"
              rules={[
                {
                  required: true,
                  warningOnly: true,
                },
              ]}
            >
              <Input placeholder="Your email" type="email" size="small" />
            </Form.Field>
            <Form.Field
              initialValue=""
              name="password"
              rules={[
                {
                  required: true,
                  warningOnly: true,
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Enter your password"
                size="small"
              />
            </Form.Field>
            <Button submit type="primary" children="Submit" />
          </Form>
          <h3>Still don't have an account?</h3>
          <Button
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
            type="primary"
            size={'large'}
            onClick={() => setErrorMessage('')}
          />
        </ConfirmationModal>
      )}
    </div>
  );
};
