import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deletePost } from "api/posts";
import { Button, ConfirmationModal } from "components";
import { useUserContext } from "context/userContext";
import { PostProps } from "types/types";
import "./PostItem.scss";

const PostItem = ({ post }: { post: PostProps }) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const navigate = useNavigate();
  const { id, role } = useUserContext();

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (post.id) {
      deletePost(post.id);
    }
    setOpenRemoveModal(false);
    window.location.reload();
  };

  return (
    <div className="post-item" key={post.id}>
        <h3 className="post-item__title">{post.title}</h3>
      <div className="post-item__content">
        <img
          className="post-item__content-image"
          src={post.imageURL}
          alt="post-logo"
        />
        <p className="post-item__content-text">{post.content}</p>
      </div>
      <div className="post-item__info">
        <div className="post-item__info-date">{post.date}</div>
        <div className="post-item__info-author">
          {post.author
            ? post.author.name + " " + post.author.surname
            : "anonymous"}
        </div>
      </div>
      <div className="post-item__action-buttons">
        {role === "administrator" || id === post.author.id ? (
          <>
            <Button
              variant="primary"
              size="small"
              onClick={() => navigate(`/posts/${post.id}/edit`)}
              children="Edit"
            />
            <Button
              variant="danger"
              size="small"
              onClick={() => setOpenRemoveModal(true)}
              children="Remove"
            />
            {openRemoveModal && (
              <ConfirmationModal
                onClick={() => setOpenRemoveModal(false)}
                title="Do you really want to delete this post?"
                open={true}
              >
                <div>
                  <Button
                    onClick={() => setOpenRemoveModal(false)}
                    children={"Cancel"}
                    variant={"primary"}
                    size={"large"}
                  />
                  <Button
                    onClick={handleDelete}
                    children={"Accept"}
                    variant={"danger"}
                    size={"large"}
                  />
                </div>
              </ConfirmationModal>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PostItem;
