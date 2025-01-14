import BlogCard from "../../components/card/blog-card";
import Layout from "../../components/layout/Layout";

const DashboardPage = () => {
  return (
    <>
      <Layout>
        <div className="overflow-y-scroll  flex flex-col p-12 gap-8 scrollbar-none">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </Layout>
    </>
  );
};

export default DashboardPage;
