import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPosts } from "../../../api/posts";
import Button from "../../../components/Button/Button";
import Grid from "../../../components/Grid/Grid";
import Layout from "../../../components/Layout/Layout";
import Modal from "../../../components/Modal/Modal";
import PostForm from "../components/PostForm";
import PostItem from "../components/PostItem";

const PostsPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { isError, isLoading, data } = useQuery(["posts"], getPosts);

  if (isError) {
    return <h1>An unknown error occured</h1>;
  }

  if (isLoading) {
    return <h1>Loading the information</h1>;
  }

  if (!data) {
    return <h1>Waiting for the information</h1>;
  }

  return (
    <Layout>
      <div className="btn-container__add-user">
        <Button
          variant="danger"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            setOpenAddModal(true);
          }}
        >
          Add a new post
        </Button>
        {openAddModal && (
          <Modal
            onClick={() => setOpenAddModal(false)}
            open={true}
          >
            <PostForm />
          </Modal>
        )}
      </div>
      <Grid columns={4}>
        {data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Grid>
    </Layout>
  );
};

export default PostsPage;
