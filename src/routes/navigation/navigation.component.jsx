import { useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { BlogContext } from "../../contexts/blogs.context";
import { getAllBlogs } from "../../utils/database-utils/dbHelpers";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setAllBlogs } = useContext(BlogContext);
  const navigate = useNavigate();

  const signOutUser = () => {
    setCurrentUser(null);
    setAllBlogs([]);
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        const response = await getAllBlogs();
        if (response.success) {
          setAllBlogs(response.data);
        }
      }
    }
    fetchData();
  }, [currentUser, setAllBlogs]);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            HOME
          </Link>
          {currentUser && (
            <Link className="nav-link" to="/blogs">
              BLOGS
            </Link>
          )}
          {currentUser &&
            (currentUser.role === "admin" ||
              currentUser.role === "super admin") && (
              <Link className="nav-link" to="/write">
                WRITE
              </Link>
            )}
          {currentUser && currentUser.role === "super admin" && (
            <Link className="nav-link" to="/publish">
              PUBLISH
            </Link>
          )}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
