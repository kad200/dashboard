import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Grid, Loader } from 'components';
import { PostItem } from 'features';
import { api } from 'api';

export const PostsPage = () => {
  const { isError, isLoading, data } = useQuery(['posts'], api.posts.getPosts);

  let navigate = useNavigate();
  const routeChange = () => {
    navigate('create');
  };

  if (isError) {
    return <h1>An unknown error occured</h1>;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className="btn-container__add-user">
        <Button
          children="Add a new post"
          variant="danger"
          size="small"
          onClick={routeChange}
        />
      </div>
      <Grid>
        {data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Grid>
    </Layout>
  );
};
