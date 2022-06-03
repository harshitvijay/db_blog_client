import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Blog from "./routes/blog/blogs.component";
import DetailedBlog from "./routes/detailedBlog/detailedBlog.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="blogs/:id" element={<DetailedBlog />} />
      </Route>
    </Routes>
  );
};

export default App;
