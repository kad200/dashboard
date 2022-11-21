import React from 'react';
import { Button } from 'ebs-design';
import { ButtonProps } from 'ebs-design/dist/components/atoms/Button/Button';
import './Button.scss';

const MyButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export { MyButton as Button };
