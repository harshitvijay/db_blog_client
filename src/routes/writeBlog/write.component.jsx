import { useState, useContext, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../../components/form-input/form-input.component";
import {
  addBlog,
  getUsersBlogs,
  updateBlog,
} from "../../utils/database-utils/dbHelpers";
import BlogCard from "../../components/blog-card/blog-card.component";
import "./write.styles.scss";
import Button from "../../components/button/button.component";

const Write = () => {
  const { currentUser } = useContext(UserContext);
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [usersBlog, setUsersBlog] = useState([]);
  const [userId, setUserId] = useState(currentUser.userId);
  const [blodId, setBlogId] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };
  const resetFormField = () => {
    setTitle("");
    setContent("");
    setIsDraft(false);
    setIsEdit(false);
    setBlogId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!(title && content)) {
        alert("Please Add title and content");
        return;
      }
      const userId = currentUser.userId;
      let status;
      let response;
      if (currentUser && currentUser.role === "admin") {
        status = isDraft ? "in draft" : "in review";
      } else if (currentUser && currentUser.role === "super admin") {
        status = isDraft ? "in draft" : "published";
      }
      const blogObj = { title, content, user_id: userId, status };
      if (isEdit) {
        response = await updateBlog(blodId, { title, content, status });
      } else {
        response = await addBlog(blogObj);
      }
      if (response.succes) {
        if (!isEdit) {
          alert(`Blog ${isDraft ? "Drafted" : "Added"}`);
        } else {
          alert(response.message);
        }
        resetFormField();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setUserId(currentUser.userId);
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const response = await getUsersBlogs(userId);
        if (response.success) {
          setUsersBlog(response.data);
        }
      }
    }
    fetchData();
  }, [userId, setUsersBlog, isEdit, isDraft]);

  return (
    <div className="write-page">
      <div className="write-container">
        <h2>Write Blog</h2>
        <span></span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Title"
            type="text"
            required
            onChange={handleChange}
            name="title"
            value={title}
          />
          <JoditEditor
            ref={editor}
            name="content"
            onChange={(content) => setContent(content)}
            value={content}
          />
          <div className="write-buttons-container">
            {!isEdit ? (
              <div className="btn-wrapper">
                <Button
                  type="submit"
                  name="post"
                  onClick={() => setIsDraft(false)}
                >
                  Post Blog
                </Button>
              </div>
            ) : (
              <div className="btn-wrapper">
                <Button
                  type="submit"
                  name="edit"
                  onClick={() => setIsDraft(false)}
                >
                  Edit Blog
                </Button>
              </div>
            )}

            <div className="btn-wrapper">
              <Button
                type="submit"
                name="draft"
                onClick={() => setIsDraft(true)}
              >
                Save as draft
              </Button>
            </div>

            <div className="btn-wrapper">
              <Button
                type="button"
                name="reset"
                onClick={() => resetFormField()}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="my-blog-heading">
        <h1 className="my-blog-heading">My Blogs</h1>
      </div>
      <div className="my-blogs">
        {usersBlog.map((blog, index) => (
          <BlogCard
            key={index}
            blog={blog}
            action={true}
            setContent={setContent}
            setTitle={setTitle}
            setIsEdit={setIsEdit}
            setBlogId={setBlogId}
            setIsDraft={setIsDraft}
          />
        ))}
      </div>
    </div>
  );
};

export default Write;
