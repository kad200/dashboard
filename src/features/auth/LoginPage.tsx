import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button } from 'ebs-design';

import { ConfirmationModal, Loader } from 'components';
import { UserLoginCredentials } from 'types/types';
import { api } from 'api';

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signInUserMutation = useMutation(
    (signInData: UserLoginCredentials) => api.users.signInUser(signInData),
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

  const handleSubmit = async (signInData: UserLoginCredentials) => {
    signInUserMutation.mutate({
      email: signInData.email,
      password: signInData.password,
    });
  };

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
          <Form onFinish={handleSubmit} className="form">
            <Form.Field
              initialValue=""
              name="email"
              label="Email"
              hideLabel
              rules={[
                {
                  required: true,
                  // warningOnly: true,
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                type="email"
                size="small"
              />
            </Form.Field>
            <Form.Field
              initialValue=""
              name="password"
              label="Password"
              hideLabel
              rules={[
                {
                  required: true,
                  // warningOnly: true,
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
            type="ghost"
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
            size="large"
            onClick={() => setErrorMessage('')}
          />
        </ConfirmationModal>
      )}
    </div>
  );
};
