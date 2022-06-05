import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { deleteBlog, updateBlog } from "../../utils/database-utils/dbHelpers";
import "./blog-card.styles.scss";

const BlogCard = ({
  blog,
  action,
  setContent,
  setTitle,
  setIsDraft,
  setIsEdit,
  setBlogId,
  publishAction,
  readerBlog,
}) => {
  const {
    blogCreatedAt,
    blogTitle,
    blogContent,
    blogId,
    blogStatus,
    userName,
  } = blog;
  return (
    <div className="wrapper">
      <div className="blog_post">
        <div className="container_copy">
          <div className="status-wrapper">
            <span className="blog-card-date">{blogCreatedAt}</span>
            <span className="blog-status">{blogStatus}</span>
          </div>
          <h2 className="blog-card-title">{blogTitle}</h2>
          <p className="blog-card-content">{parse(blogContent)}</p>
          {readerBlog && (
            <small className="blog-card-author">Author: {userName}</small>
          )}
        </div>
        <Link className="btn_primary" to={`${blogId}`}>
          Read More
        </Link>
        {action && (
          <div className="card-button-wrapper">
            <div className="blog-btn">
              <button
                className="btn_primary"
                onClick={() => {
                  setContent(blog.blogContent);
                  setTitle(blog.blogTitle);
                  setIsEdit(true);
                  setBlogId(blog.blogId);
                }}
              >
                Edit Blog
              </button>
            </div>
            <div className="blog-btn">
              <button
                className="btn_primary"
                onClick={async () => {
                  if (
                    window.confirm("Are you sure you want to delete the blog?")
                  ) {
                    const response = await deleteBlog(blog.blogId);
                    if (response.succes) {
                      setIsDraft(false);
                      alert(response.message);
                    }
                  }
                }}
              >
                Delete Blog
              </button>
            </div>
          </div>
        )}
        {publishAction && (
          <div className="card-button-wrapper">
            <div className="blog-btn">
              <button
                className="btn_primary"
                onClick={async () => {
                  if (
                    window.confirm("Are you sure you want to Publish the blog?")
                  ) {
                    const response = await updateBlog(blogId, {
                      title: blogTitle,
                      content: blogContent,
                      status: "published",
                    });
                    if (response.succes) {
                      alert(response.message);
                    }
                  }
                }}
              >
                Approve & Publish
              </button>
            </div>
            <div className="blog-btn">
              <button
                className="btn_primary"
                onClick={async () => {
                  if (
                    window.confirm("Are you sure you want to Reject the blog?")
                  ) {
                    const response = await updateBlog(blogId, {
                      title: blogTitle,
                      content: blogContent,
                      status: "rejected",
                    });
                    if (response.succes) {
                      alert(response.message);
                    }
                  }
                }}
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
