import React from "react";
import Layout from "./Layout";
import "../styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <Link to="/albums">
        <div id="testbutton"></div>
      </Link>
    </Layout>
  );
};

export default Home;
