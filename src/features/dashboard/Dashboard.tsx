import { useQuery } from "@tanstack/react-query";
import { getPosts } from "api/posts";
import { getUsers } from "api/users";
import { Button, Layout } from "components";
import Chart from "components/Chart/Chart";
import Widget from "components/Widget/Widget";
import { useNavigate } from "react-router-dom";

export interface WidgetDataProps {
  title: string;
  length: number;
  icon: React.ReactNode;
  link: {
    path: string;
    name: string;
  };
}

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

  const dataPosts: WidgetDataProps = {
    title: "Total posts",
    length: postsData.length,
    icon: <img src="/posts-icon.png" alt="logo" />,
    link: {
      path: "/posts",
      name: "View all posts",
    },
  };

  const dataUsers: WidgetDataProps = {
    title: "Total users",
    length: usersData.length,
    icon: <img src="/users-icon.png" alt="logo" />,
    link: {
      path: "/",
      name: "See all users",
    },
  };

  const authorPostsArray = usersData.map((user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    value: 0,
  }));

  const postsPerId: number[] = [];
  postsData.forEach((post) => {
    const authorId = post.author.id;
    authorId in postsPerId
      ? postsPerId[authorId]++
      : (postsPerId[authorId] = 1);

    authorPostsArray.forEach((el) => {
      if (!!postsPerId[el.id - 1] === true) {
        el.value = postsPerId[el.id - 1];
      }
    });

    // for (let i = 0; i < authorPostsArray.length; i++) {
    //   if (!!postsPerId[i] === true) {
    //     authorPostsArray[i].value = postsPerId[i];
    //   }
    // }
  });

  console.log(postsPerId);
  console.log(authorPostsArray);

  return (
    <Layout>
      <Widget data={dataPosts} />
      <Widget data={dataUsers} />
      {/* {array.map((array) => (
        <div key={array.id}>{array.name}</div>
      ))} */}
      <Chart props={authorPostsArray} />
    </Layout>
  );
};

export default Dashboard;
