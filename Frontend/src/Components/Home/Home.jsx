import React from "react";
import BlogList from "./BlogList";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20">
        <h1>hello</h1>
        <BlogList />
      </div>
    </>
  );
};

export default Home;
