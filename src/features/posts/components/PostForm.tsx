import Input from "../../../components/Input/Input";
import useSetState from "../../../hooks/useSetState";
import { PostProps } from "../../../types/types";

interface PostFormProps {
  post?: PostProps;
}

const PostForm = ({ post }: PostFormProps) => {
  const [postForm, setPostForm] = useSetState(
    post
      ? post
      : {
          title: "",
          content: "",
          image: "",
          date: "",
          author: "",
        }
  );

  return (
    <form className="form">
      <Input
        id="title"
        type="text"
        placeholder="Title"
        value={postForm.title}
        onChange={(event) => setPostForm({ title: event.target.value })}
      />
      <Input
        id="content"
        type="textarea"
        placeholder="Content"
        value={postForm.content}
        onChange={(event) => setPostForm({ surname: event.target.value })}
      />
      <Input
        id="image"
        type="text"
        placeholder="Please put a link to an image"
        value={postForm.image}
        onChange={(event) => setPostForm({ image: event.target.value })}
      />
      <Input
        id="date"
        type="date"
        // placeholder="Please put a link to an image"
        value={postForm.date}
        onChange={(event) => setPostForm({ date: event.target.value })}
      />
      <div>Author</div>
    </form>
  );
};

export default PostForm;
