import { useState } from "react";
import Button from "../../../components/Button/Button";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Modal from "../../../components/Modal/Modal";
import { PostProps } from "../../../types/types";
import "./PostItem.scss";

const PostItem = ({ post }: { post: PostProps }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  return (
    <div className="post-item" key={post.id}>
      <div className="post-item__title">
        <span className="post-item__title-name">{post.title}</span>
      </div>
      <div className="post-item__content">
        <p className="post-item__content-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <img
          className="post-item__content-image"
          src="https://images.unsplash.com/photo-1664058986963-5f531744c710?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1146&q=80"
          alt="post-logo"
        ></img>
      </div>
      <div className="post-item__info">
        <div className="post-item__info-date">02/02/2022</div>
        <div className="post-item__info-author">Bad Boys</div>
      </div>
      <div className="post-item__action-buttons">
        <Button
          variant="primary"
          size="small"
          onClick={() => setOpenEditModal(true)}
        >
          Edit
        </Button>
        {openEditModal && (
          <Modal onClick={() => setOpenEditModal(false)} open={true}></Modal>
        )}
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
            title=""
            open={true}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default PostItem;
