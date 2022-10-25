import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Layout } from "components";
import { PostForm } from "features";
import { api } from "api";

export const AddPostPage = () => {
  const { id: postId } = useParams();
  const { isFetching, data: post } = useQuery(
    ["posts", postId],
    () => api.posts.getPost(Number(postId)),
    {
      enabled: !!postId,
    }
  );

  if (isFetching) {
    return <h1>Be patient</h1>;
  }

  return (
    <Layout>
      <div className="post-edit">
        <PostForm post={post ? post : null} />
      </div>
    </Layout>
  );
};
