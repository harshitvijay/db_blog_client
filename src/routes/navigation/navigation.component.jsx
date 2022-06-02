import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutUser = () => {
    setCurrentUser(null);
    sessionStorage.clear();
  };
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
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          {/* {isCartOpen && <CartDropdown />} */}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
