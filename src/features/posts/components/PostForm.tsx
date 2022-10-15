// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addPost, editPost, getPosts } from "api/posts";
import { Button, Input } from "components";
import { useUserContext } from "context/userContext";
import useSetState from "hooks/useSetState";
import { PostProps } from "types/types";
import "./PostForm.scss";

interface PostFormProps {
  post: PostProps | null;
}

const PostForm = (post: PostFormProps) => {
  const { name, surname, id } = useUserContext();

  // const { id: postId } = useParams();
  // const {
  //   isFetching,
  //   isLoading,
  //   // isSuccess,
  //   data: post,
  // } = useQuery(["posts", postId], () => getPost(Number(postId)), );

  // console.log(post);

  const [postForm, setPostForm] = useSetState(
    post.post?.id
      ? {
          title: post.post?.title,
          content: post.post?.content,
          imageURL: post.post?.imageURL,
          date: post.post?.date,
          author: {
            name: name,
            surname: surname,
            id: id,
          },
        }
      : {
          title: "",
          content: "",
          image: "",
          date: "",
          author: {
            name: name,
            surname: surname,
            id: id,
          },
        }
  );

  console.log(postForm);
  const navigate = useNavigate();

  // if (isLoading || isFetching) {
  //   return <h1>Be patient</h1>;
  // }

  const handleBack = () => {
    console.log("push me");
    navigate("/posts");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const postData = {
      title: postForm.title,
      content: postForm.content,
      imageURL: postForm.imageURL,
      date: postForm.date,
      author: postForm.author,
    };

    post.post?.id
      ? editPost({
          id: post.post?.id,
          ...postData,
        })
      : addPost(postData);

    setPostForm("");
    navigate("/posts");
    getPosts();
  };

  return (
    <form className="form">
      <Input
        id="title"
        type="text"
        placeholder="Title"
        value={postForm.title}
        onChange={(event) => setPostForm({ title: event.target.value })}
      />
      <textarea
        id="content"
        className="form__textarea"
        placeholder="Content"
        value={postForm.content}
        onChange={(event) => setPostForm({ content: event.target.value })}
      />
      <Input
        id="image"
        type="text"
        placeholder="Please put a link to an image"
        value={postForm.imageURL}
        onChange={(event) => setPostForm({ imageURL: event.target.value })}
      />
      <Input
        id="date"
        type="date"
        value={postForm.date}
        onChange={(event) => setPostForm({ date: event.target.value })}
      />
      <div className="post-edit-author">
        {post.post?.id
          ? post.post?.author.name + " " + post.post?.author.surname
          : `${name} ${surname}`}
      </div>
      <br />
      <Button
        type="button"
        onClick={handleBack}
        children={"Go back"}
        variant={"danger"}
        size={"small"}
      ></Button>
      <Button
        type="button"
        onClick={handleSubmit}
        children={"Submit"}
        variant={"primary"}
        size={"small"}
      ></Button>
    </form>
  );
};

export default PostForm;
