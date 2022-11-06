import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Layout, Loader } from "components";
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
    return <Loader />;
  }

  return (
    <Layout>
      <div className="post-edit">
        <PostForm post={post ? post : null} />
      </div>
    </Layout>
  );
};
