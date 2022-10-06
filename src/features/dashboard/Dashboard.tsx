import { useQuery } from "@tanstack/react-query";
import { getPosts } from "api/posts";
import { getUsers } from "api/users";
import { Button, Layout } from "components";
import Widget from "components/Widget/Widget";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isError: isPostsError, data: postsData } = useQuery(
    ["posts"],
    getPosts
  );
  const { isError: isUsersError, data: usersData } = useQuery(
    ["users"],
    getUsers
  );

  if (isPostsError || isUsersError) {
    return <h1>An unknown error occured</h1>;
  }

  if (!postsData || !usersData) {
    return <h1>Waiting for the information</h1>;
  }

  const dataPosts = {
    title: "Total posts",
    length: postsData.length,
    icon: <img src="/posts-icon.png" alt="logo" />,
    link: {
      path: "/posts",
      name: "View all posts",
    },
  };

  const dataUsers = {
    title: "Total users",
    length: usersData.length,
    icon: <img src="/users-icon.png"  alt="logo" />,
    link: {
      path: "/",
      name: "See all users",
    },  };
  

  for (let i = 0; i < usersData.length; i++) {
  const postsByUser = postsData.filter(post => post.author.id === i).length
  console.log(postsByUser)
  }

  return (
    <Layout>
      <Widget data={dataPosts} />
      <Widget data={dataUsers} />
    </Layout>
  );
};

export default Dashboard;
