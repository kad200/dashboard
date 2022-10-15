import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPost } from "api/posts";
import { Layout } from "components";
import PostForm from "../components/PostForm";

const AddPostPage = () => {

  const { id: postId } = useParams();
  const {
    isFetching,
    data: post,
  } = useQuery(["posts", postId], () => getPost(Number(postId)), {
    enabled: !!postId,
  });

  console.log(post);

    if ( isFetching) {
    return <h1>Be patient</h1>;
  }
  
  return (
    <Layout>
      <div className="post-edit">
        <PostForm post={post ? post : null}/>
      </div>
    </Layout>
  );
};

export default AddPostPage;
