import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getPosts } from "api/posts";
import { Layout, Button, Grid } from "components";
import PostItem from "../components/PostItem";

const PostsPage = () => {
  const { isError, data } = useQuery(["posts"], getPosts);

  let navigate = useNavigate();
  const routeChange = () => {
    navigate("create");
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
          children="Add a new post"
          variant="danger"
          size="small"
          onClick={routeChange}
        />
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
