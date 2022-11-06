import { Roles } from 'types/enums';

export interface UserProps {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: string;
  password?: string;
  role: Roles.administrator | Roles.moderator;
}

export type UserLoginCredentials = Pick<UserProps, 'email' | 'password'>;

export type UserRegistrationParams = Omit<UserProps, 'id'>;

export interface PostProps {
  id?: number;
  title: string;
  content: string;
  imageURL: string;
  date: string;
  author: Author;
}

export type Author = Pick<UserProps, 'id' | 'name' | 'surname'>;

export type ChartPieShapeProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: Author;
  percent: number;
  value: number;
};

export type ChartProps = {
  props?: { id: number; name: string; surname: string; value: number }[];
};

export interface WidgetDataProps {
  title: string;
  length?: number;
  icon: React.ReactNode;
  link: {
    path: string;
    name: string;
  };
}