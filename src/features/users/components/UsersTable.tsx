import { Table } from 'ebs-design';

import { UserProps } from 'types/types';
import { UserItemButtons } from './UserItemButtons';

import './TableContainer.scss';

interface UsersTableProps {
  users: UserProps[];
}

const columns = [
  {
    dataIndex: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'name',
    title: 'Name',
  },
  {
    dataIndex: 'surname',
    title: 'Surname',
  },
  {
    dataIndex: 'email',
    title: 'Email',
  },
  {
    dataIndex: 'gender',
    title: 'Gender',
  },
  {
    dataIndex: 'role',
    title: 'Role',
  },
  {
    dataIndex: 'actions',
    title: 'Actions',
    render: (user: UserProps) => <UserItemButtons user={user} />,
  },
];

export const UsersTable = ({ users }: UsersTableProps) => {
  return <Table data={users} columns={columns} />;
};
