import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Button, Select, Checkbox, Input } from 'ebs-design';

import { Loader, ConfirmationModal } from 'components';
import { Roles } from 'types/enums';
import { api } from 'api';
import { UserRegistrationParams } from 'types/types';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

export const RegisterPage = () => {
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordConfirmationRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  const password = passwordRef.current?.value;
  const passwordConfirmation = passwordConfirmationRef.current?.value;

  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordConfirmation, setValidPasswordConfirmation] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidPasswordConfirmation(password === passwordConfirmation);
  }, [password, passwordConfirmation]);

  const signUpUserMutation = useMutation(
    (signUpData: UserRegistrationParams) => api.users.signUpUser(signUpData),
    {
      onError: (error: Error) => {
        setErrorMessage(error.message);
      },
      onSuccess: () => {
        navigate('/login');
        queryClient.invalidateQueries();
      },
    },
  );

  const handleSubmit = async (signUpData: UserRegistrationParams) => {
    if (!validPassword) {
      setErrorMessage('Invalid password');
      return;
    }
    if (!validPasswordConfirmation) {
      setErrorMessage('Invalid password confirmation');
      return;
    }
    signUpUserMutation.mutate({
      name: signUpData.name,
      surname: signUpData.surname,
      email: signUpData.email,
      gender: signUpData.gender,
      password: signUpData.password,
      role: Roles.moderator,
    });
  };

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
          <Form className="auth-page__form" onFinish={handleSubmit}>
            <Form.Field
              initialValue=""
              name="name"
              label="First name"
              hideLabel
              rules={[
                {
                  required: true,
                  // warningOnly: true,
                },
              ]}
            >
              <Input placeholder="First name" autoComplete="off" />
            </Form.Field>
            <Form.Field
              initialValue=""
              name="surname"
              label="Last name"
              hideLabel
              rules={[
                {
                  required: true,
                  // warningOnly: true,
                },
              ]}
            >
              <Input placeholder="Last name" type="text" autoComplete="off" />
            </Form.Field>
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
              <Input placeholder="Email" type="email" />
            </Form.Field>
            <Form.Field
              initialValue="None"
              name="gender"
              label="Gender"
              hideLabel
              rules={[
                {
                  required: true,
                  // warningOnly: true,
                },
              ]}
            >
              <Select
                label="Please set your gender:"
                placeholder="gender"
                options={[
                  { value: 'male', text: 'Male' },
                  { value: 'female', text: 'Female' },
                ]}
              ></Select>
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
              <Input placeholder="Password" type="password" ref={passwordRef} />
            </Form.Field>
            <Form.Field
              initialValue=""
              name="password-confirmation"
              label="Password confirmation"
              hideLabel
              rules={[
                {
                  required: true,
                  // warningOnly: true,
                },
              ]}
            >
              <Input
                placeholder="Password confirmation"
                type="password"
                ref={passwordConfirmationRef}
              />
            </Form.Field>
            <Form.Field
              initialValue=""
              name="personal-consent"
              label="Personal consent"
              hideLabel
              rules={[
                {
                  required: true,
                  // warningOnly: true,
                },
              ]}
            >
              <Checkbox
                checkAlign="left"
                text="I consent with personal data processing"
              />
            </Form.Field>
            <Button submit children="Sign up" />
            {errorMessage && (
              <ConfirmationModal
                title={errorMessage}
                open={false}
                onClick={() => setErrorMessage('')}
              >
                <Button
                  children="Try again"
                  onClick={() => setErrorMessage('')}
                />
              </ConfirmationModal>
            )}
          </Form>
        </section>
      )}
    </div>
  );
};
