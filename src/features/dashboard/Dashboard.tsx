import { useQuery } from "@tanstack/react-query";
import { getPosts } from "api/posts";
import { getUsers } from "api/users";
import { Layout } from "components";
import ChartBar from "components/Chart/ChartBar";
import ChartPie from "components/Chart/ChartPie";
import Widget from "components/Widget/Widget";
import "./Dashboard.scss";

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
    const authorId = post.author.id - 1;
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
      <div className="dashboard-page">
        <section className="dashboard-page__widgets">
          <Widget data={dataPosts} />
          <Widget data={dataUsers} />
        </section>
        <section className="dashboard-page__charts">
          <ChartBar props={authorPostsArray} />
          <ChartPie props={authorPostsArray} />
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
