import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogDetails } from "../../utils/database-utils/dbHelpers";
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
  });

  return (
    <section className="introduction">
      {syncing ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          {blogDetails.blog.title && <h2>{blogDetails.blog.title}</h2>}

          <p>
            <em>Blog By </em>
            &nbsp;&nbsp;&nbsp;{" "}
            {blogDetails.user.username && (
              <strong>
                <em>{blogDetails.user.username}</em>
              </strong>
            )}
          </p>
          <p>
            <em>Created at:</em>
            &nbsp;&nbsp;&nbsp;{" "}
            {blogDetails.blog.created_at && (
              <strong>
                <em>{blogDetails.blog.created_at}</em>
              </strong>
            )}
          </p>

          {blogDetails.blog.content && <p>{blogDetails.blog.content}</p>}
        </div>
      )}
    </section>
  );
};

export default DetailedBlog;
