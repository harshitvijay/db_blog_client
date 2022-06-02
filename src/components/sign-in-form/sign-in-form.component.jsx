import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  loginUser,
  verifyUserBy2fa,
} from "../../utils/database-utils/dbHelpers";
import { UserContext } from "../../contexts/user.context";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  username: "",
  password: "",
  security_que: "",
  security_ans: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password, security_que, security_ans } = formFields;
  const [show, setShow] = useState(false);
  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!show) {
        if (!(username && password)) {
          alert("please enter username and password");
          return;
        }
        const response = await loginUser({ username, password });
        if (response.success) {
          setFormFields({
            ...formFields,
            username: response.data.username,
            security_que: response.data.security_que,
          });
          setShow(true);
        }
      } else {
        if (username && security_que && security_ans) {
          console.log(1);
          const response = await verifyUserBy2fa({
            username,
            security_que,
            security_ans,
          });
          if (response.success) {
            sessionStorage.setItem("token", response.token);
            setCurrentUser(response.data);
            alert(response.message);
            setShow(false);
            resetFormField();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your username and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          required
          readOnly={show ? true : false}
          onChange={handleChange}
          name="username"
          value={username}
        />
        {!show && (
          <>
            <FormInput
              label="Password"
              type="password"
              required
              onChange={handleChange}
              name="password"
              value={password}
            />
            <div className="buttons-container">
              <Button type="submit">Sign In</Button>
            </div>
          </>
        )}
        {show && (
          <>
            <FormInput
              label="Security Question"
              type="text"
              required
              readOnly
              name="security_que"
              value={security_que}
            />
            <FormInput
              label="Security Answer"
              type="text"
              required
              name="security_ans"
              value={security_ans}
              onChange={handleChange}
            />
            <div className="buttons-container">
              <Button type="submit">Verify</Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
