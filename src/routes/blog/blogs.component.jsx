import { useContext } from "react";
import BlogCard from "../../components/blog-card/blog-card.component";
import { BlogContext } from "../../contexts/blogs.context";
import "./blogs.styles.scss";

const Blog = () => {
  const { allBlogs } = useContext(BlogContext);

  return (
    <div className="blog-container">
      {allBlogs
        .filter((obj) => obj.blogStatus === "published")
        .map((item, index) => (
          <BlogCard key={index} blog={item} />
        ))}
    </div>
  );
};

export default Blog;
