import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from 'context/userContext';
import { PostProps } from 'types/types';
import { Roles } from 'types/enums';
import { Button, ConfirmationModal } from 'components';
import './PostItem.scss';
import { api } from 'api';

export const PostItem = ({ post }: { post: PostProps }) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { id, role } = useUserContext();

  const handleDelete = async () => {
    if (post.id) {
      editUserMutation.mutate(post.id);
    }
    setOpenRemoveModal(false);
  };

  const editUserMutation = useMutation(
    (id: number) => api.posts.deletePost(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

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
        <span className="post-item__info-date">{post.date}</span>
        <p className="post-item__info-author">
          {post.author
            ? post.author.name + ' ' + post.author.surname
            : 'anonymous'}
        </p>
      </div>
      <div className="post-item__action-buttons">
        {role === Roles.administrator || id === post.author.id ? (
          <>
            <Button
              onClick={() => navigate(`/posts/${post.id}/edit`)}
              children="Edit"
              type="primary"
            />
            <Button
              onClick={() => setOpenRemoveModal(true)}
              children="Remove"
            />
            {openRemoveModal && (
              <ConfirmationModal
                onClick={() => setOpenRemoveModal(false)}
                title="Do you really want to delete this post?"
                open
              >
                <div className="modal__content-buttons">
                  <Button
                    onClick={() => setOpenRemoveModal(false)}
                    children="Cancel"
                  />
                  <Button onClick={handleDelete} children="Delete" />
                </div>
              </ConfirmationModal>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
