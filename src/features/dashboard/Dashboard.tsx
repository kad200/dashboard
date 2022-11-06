import { useQueries } from '@tanstack/react-query';
import { api } from 'api';
import { Layout, ChartBar, ChartPie, Widget, Loader } from 'components';
import { PostProps, WidgetDataProps } from 'types/types';
import './Dashboard.scss';

export const Dashboard = () => {
  const {
    '0': { isError: isPostsError, isLoading: isPostsLoading, data: postsData },
    '1': { isError: isUsersError, isLoading: isUsersLoading, data: usersData },
  } = useQueries({
    queries: [
      { queryKey: ['posts', 1], queryFn: api.posts.getPosts },
      { queryKey: ['users', 2], queryFn: api.users.getUsers },
    ],
  });

  if (isPostsError || isUsersError) {
    return <h1>An unknown error occured</h1>;
  }

  if (isPostsLoading || isUsersLoading) {
    return <Loader />;
  }

  const dataPosts: WidgetDataProps = {
    title: 'Total posts',
    length: postsData?.length,
    icon: <img src="/posts-icon.png" alt="logo" />,
    link: {
      path: '/posts',
      name: 'View all posts',
    },
  };

  const dataUsers: WidgetDataProps = {
    title: 'Total users',
    length: usersData?.length,
    icon: <img src="/users-icon.png" alt="logo" />,
    link: {
      path: '/',
      name: 'See all users',
    },
  };

  const authorPostsArray = usersData?.map((user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    value: 0,
  }));

  const postsPerId: number[] = [];

  const postByAuthor = (post: PostProps) => {
    const authorId = post.author.id - 1;
    authorId in postsPerId
      ? postsPerId[authorId]++
      : (postsPerId[authorId] = 1);
  };

  postsData?.forEach((post) => {
    postByAuthor(post);

    authorPostsArray?.forEach((element) => {
      if (!!postsPerId[element.id - 1] === true) {
        element.value = postsPerId[element.id - 1];
      }
    });
  });

  return (
    <Layout>
      <div className="dashboard-page">
        <section className="dashboard-page__widgets">
          <Widget data={dataPosts} />
          <Widget data={dataUsers} />
        </section>
        <section className="dashboard-page__charts">
          <ChartBar props={authorPostsArray} />
          <ChartPie props={authorPostsArray} />
        </section>
      </div>
    </Layout>
  );
};
