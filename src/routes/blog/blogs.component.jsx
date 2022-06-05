import { useContext, useState } from "react";
import BlogCard from "../../components/blog-card/blog-card.component";
import { BlogContext } from "../../contexts/blogs.context";
import SearchBox from "../../components/search-box/search-box.component";
import "./blogs.styles.scss";

const Blog = () => {
  const { allBlogs } = useContext(BlogContext);
  const [inputVal, setInputVal] = useState("");
  const [isSort, setIsSort] = useState(false);

  const onSearchChange = (event) => {
    setInputVal(event.target.value.toLowerCase());
  };
  const filteredBlogs = allBlogs.filter((blog) => {
    return blog.blogTitle.toLowerCase().includes(inputVal);
  });
  const sortByPublishDate = () => {
    setIsSort(!isSort);
    filteredBlogs.sort(function (b, a) {
      var keyA = new Date(a.blogCreatedAt),
        keyB = new Date(b.blogCreatedAt);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
  };
  const sortByAuthor = () => {
    setIsSort(!isSort);
    filteredBlogs.sort((a, b) => (a.userName < b.userName ? 1 : -1));
    setInputVal("");
  };
  return (
    <div>
      <div className="blog-container">
        <h1>Blogs</h1>
      </div>
      {console.log(100)}
      <SearchBox
        className="blog-search-box"
        onChangeHandler={onSearchChange}
        placeholder={"Search Blogs By Title"}
      />
      <div>
        <button onClick={sortByPublishDate}>Sort By Date</button>
        <button onClick={sortByAuthor}>Sort By Author</button>
      </div>
      <div className="blog-container">
        {filteredBlogs
          .filter((obj) => obj.blogStatus === "published")
          .map((item, index) => (
            <BlogCard key={index} blog={item} readerBlog={true} />
          ))}
      </div>
    </div>
  );
};

export default Blog;
