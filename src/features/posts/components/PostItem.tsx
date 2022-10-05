import { deletePost } from "api/posts";
import { Button, ConfirmationModal } from "components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostProps } from "types/types";
import "./PostItem.scss";

const PostItem = ({ post }: { post: PostProps }) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    if (post.id) {
      deletePost(post.id);
    }
    window.location.pathname = "/";
  };

  return (
    <div className="post-item" key={post.id}>
      <div className="post-item__title">
        <span className="post-item__title-name">{post.title}</span>
      </div>
      <div className="post-item__content">
        <img
          className="post-item__content-image"
          src={post.imageURL}
          alt="post-logo"
        ></img>
        <p className="post-item__content-text">{post.content}</p>
      </div>
      <div className="post-item__info">
        <div className="post-item__info-date">{post.date}</div>
        <div className="post-item__info-author">
          {/* {post.author.name
            ? post.author.name + " " + post.author.surname
            : "anonymous"} */}
        </div>
      </div>
      <div className="post-item__action-buttons">
        <Button
          variant="primary"
          size="small"
          // onClick={() => navigate(`/${post.id}/edit`)}
          onClick={() => navigate(`/posts/${post.id}/edit`)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={() => setOpenRemoveModal(true)}
        >
          Remove
        </Button>
        {openRemoveModal && (
          <ConfirmationModal
            onClick={() => setOpenRemoveModal(false)}
            title="Do you really want to delete this post?"
            open={true}
          >
            <Button
              onClick={handleDelete}
              children={"Accept"}
              variant={"danger"}
              size={"small"}
            ></Button>
          </ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default PostItem;
