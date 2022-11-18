import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'context/userContext';
import { Button } from 'components';
import { api } from 'api';

import './Topbar.scss';
import { Avatar, AvatarInline } from 'ebs-design';

export const Topbar: React.FC = () => {
  const { name, surname, role } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    api.users.logoutUser();
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div className="topbar__logo">
        <img onClick={() => navigate('/')} src="/logo.png" alt="logo" />
      </div>
      <div className="topbar__user-container">
        <Avatar
          alt={`${name} ${surname}`}
          className="topbar__user-container-name"
          icon=""
          shortAlt={`${name?.charAt(0)} ${surname?.charAt(0)}`}
          shortLetters={4}
          size="big"
          type="light"
        />
        <Button
          onClick={handleLogout}
          children={'logout'}
          variant={'danger'}
          size={'small'}
        ></Button>
      </div>
    </div>
  );
};
