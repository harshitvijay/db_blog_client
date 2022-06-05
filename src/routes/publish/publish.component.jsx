import { useContext } from "react";
import BlogCard from "../../components/blog-card/blog-card.component";
import { BlogContext } from "../../contexts/blogs.context";
import "./publish.styles.scss";

const Publish = () => {
  const { allBlogs } = useContext(BlogContext);
  return (
    <div className="publish-container">
      <div>
        <div className="publish-heading">
          <h2>Publish Blogs That are Under Review</h2>
        </div>
        <div className="publish-content">
          {allBlogs
            .filter((blog) => blog.blogStatus === "in review")
            .map((item, index) => (
              <BlogCard
                key={index}
                blog={item}
                publishAction={true}
                readerBlog={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Publish;
