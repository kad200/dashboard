import { useQuery } from "@tanstack/react-query";
import { getPosts } from "api/posts";
import { Layout, Button, Grid } from "components";

import { useNavigate } from "react-router-dom";

import PostItem from "../components/PostItem";

const PostsPage = () => {
  const { isError, data } = useQuery(["posts"], getPosts);

  let navigate = useNavigate();
  const routeChange = () => {
    navigate('create');
  };

  if (isError) {
    return <h1>An unknown error occured</h1>;
  }

  if (!data) {
    return <h1>Waiting for the information</h1>;
  }

  return (
    <Layout>
      <div className="btn-container__add-user">
        <Button
          variant="danger"
          size="small"
          onClick={routeChange}
        >
          Add a new post
        </Button>
      </div>
      <Grid columns={4}>
        {data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Grid>
    </Layout>
  );
};

export default PostsPage;
