import { useNavigate } from "react-router-dom";
import { useUserContext } from "context/userContext";
import { useSetState } from "hooks";
import { PostProps } from "types/types";
import { Button, Input } from "components";
import { api } from "api";
import "./PostForm.scss";

interface PostFormProps {
  post: PostProps | null;
}

export const PostForm = (post: PostFormProps) => {
  const { name, surname, id } = useUserContext();
  const [postForm, setPostForm] = useSetState(
    post.post
      ? {
          title: post.post.title,
          content: post.post.content,
          imageURL: post.post.imageURL,
          date: post.post.date,
          author: {
            name: post.post.author.name,
            surname: post.post.author.surname,
            id: post.post.author.id,
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

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/posts");
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const postData = {
      title: postForm.title,
      content: postForm.content,
      imageURL: postForm.imageURL,
      date: postForm.date,
      author: postForm.author,
    };

    post.post?.id
      ? api.posts.editPost({
          id: post.post?.id,
          ...postData,
        })
      : api.posts.addPost(postData);

    setPostForm("");
    navigate("/posts");
    api.posts.getPosts();
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
