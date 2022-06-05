import axios from "axios";
import { baseApiUrl } from "../../constant";

export const createUser = async (user) => {
  try {
    delete user.confirmPassword;
    const response = await axios.post(`${baseApiUrl}/api/auth/register`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (credential) => {
  try {
    const response = await axios.post(
      `${baseApiUrl}/api/auth/login`,
      credential
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyUserBy2fa = async (credential) => {
  try {
    const response = await axios.post(`${baseApiUrl}/api/auth/2fa`, credential);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
    };
    const response = await axios.get(`${baseApiUrl}/api/blogs`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogDetails = async (id) => {
  try {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
    };
    const response = await axios.get(`${baseApiUrl}/api/blogs/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBlog = async (blog) => {
  try {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
    };
    const response = await axios.post(
      `${baseApiUrl}/api/users/${blog.user_id}/blogs`,
      blog,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersBlogs = async (id) => {
  try {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
    };
    const response = await axios.get(`${baseApiUrl}/api/users/${id}/blogs`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (id, changes) => {
  try {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
    };
    const response = await axios.patch(
      `${baseApiUrl}/api/blogs/${id}`,
      changes,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    const headers = {
      Authorization: sessionStorage.getItem("token"),
    };
    const response = await axios.delete(`${baseApiUrl}/api/blogs/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
