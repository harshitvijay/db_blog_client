import axios from "axios";
import { baseApiUrl } from "../../constant";
// const headers = {
//   Authorization: "Bearer my-token",
// };
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
