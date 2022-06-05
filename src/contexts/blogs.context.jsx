import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./user.context";
import { getAllBlogs } from "../utils/database-utils/dbHelpers";

export const BlogContext = createContext({
  blogSyncing: false,
  allBlogs: [],
  setAllBlogs: () => [],
});

export const BlogProvider = ({ children }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const value = { allBlogs, setAllBlogs };
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    setInterval(async () => {
      if (currentUser) {
        const response = await getAllBlogs();
        if (response.success) {
          setAllBlogs(response.data);
        }
      }
    }, 60000);
  }, [currentUser]);

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
