import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogDetails } from "../../utils/database-utils/dbHelpers";
import parse from "html-react-parser";
import "./detailedBlog.styles.scss";

const DetailedBlog = () => {
  const [blogDetails, setBlogDetails] = useState({});
  const [syncing, setSyncing] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    const response = await getBlogDetails(id);
    if (response.success) {
      setBlogDetails(response.data);
      setSyncing(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="introduction">
      {syncing ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="detailed-blog">
          <div className="title">
            {blogDetails.blog.title && <div>{blogDetails.blog.title}</div>}
          </div>
          <div className="created-by">
            <div className="username">
              <div>
                <em>Blog By </em>
                &nbsp;&nbsp;&nbsp;{" "}
                {blogDetails.user.username && (
                  <strong>
                    <em>{blogDetails.user.username}</em>
                  </strong>
                )}
              </div>
            </div>
            <div className="date">
              <div>
                <em>Created at:</em>
                &nbsp;&nbsp;&nbsp;{" "}
                {blogDetails.blog.created_at && (
                  <strong>
                    <em>{blogDetails.blog.created_at}</em>
                  </strong>
                )}
              </div>
            </div>
          </div>
          <div className="content">
            {blogDetails.blog.content && (
              <div>{parse(blogDetails.blog.content)}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailedBlog;
