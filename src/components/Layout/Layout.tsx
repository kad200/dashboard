import { Button } from 'components';
import { Layout, AvatarInline, Sidebar, Icon } from 'ebs-design';
import { useNavigate } from 'react-router-dom';
import { api } from 'api';
import { useUserContext } from 'context/userContext';

import './Layout.scss';

const MainLayout = (props: any) => {
  const navigate = useNavigate();
  const { name, surname, role } = useUserContext();

  const handleLogout = () => {
    api.users.logoutUser();
    navigate('/login');
  };

  return (
    <Layout>
      <Layout.Topbar className="topbar">
        <Layout.Topbar.LeftSide>
          <div className="topbar__logo">
            <img
              onClick={() => navigate('/')}
              src="/logo.png"
              height="60px"
              alt="logo"
            />
          </div>
        </Layout.Topbar.LeftSide>

        <Layout.Topbar.RightSide>
          <AvatarInline
            className="topbar__avatar"
            alt={`${name} ${surname}`}
            description={`${role}`}
            status="active"
            type="regular"
            size="small"
          />
          <Button
            onClick={handleLogout}
            children={'logout'}
            variant={'danger'}
            size={'small'}
          />
        </Layout.Topbar.RightSide>
      </Layout.Topbar>

      <Sidebar>
        <Sidebar.TopMenu>
          <Sidebar.Item
            onClick={() => navigate('/')}
            prefix={<Icon type="users" />}
            text="Our team"
          />
          <Sidebar.Item
            onClick={() => navigate('/posts')}
            prefix={<Icon type="message" />}
            text="See all posts"
          />
          <Sidebar.Item
            onClick={() => navigate('/dashboard')}
            prefix={<Icon type="chart" />}
            text="Dashboard"
          />
        </Sidebar.TopMenu>
      </Sidebar>

      <Layout.Content>{props.children} </Layout.Content>
    </Layout>
  );
};

export { MainLayout as Layout };
