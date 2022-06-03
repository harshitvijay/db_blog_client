import { Link } from "react-router-dom";
import "./blog-card.styles.scss";

const BlogCard = ({ blog }) => {
  const { blogCreatedAt, blogTitle, blogContent, blogId } = blog;
  return (
    <div className="wrapper">
      <div className="blog_post">
        <div className="container_copy">
          <h3>{blogCreatedAt}</h3>
          <h2>{blogTitle}</h2>
          <p>{blogContent}</p>
        </div>
        <Link className="btn_primary" to={`${blogId}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
