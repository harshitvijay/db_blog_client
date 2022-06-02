import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import SelectInput from "../select-input/select-input.component";
import Button from "../button/button.component";
import { createUser } from "../../utils/database-utils/dbHelpers";
import { Role, SecurityQuestion } from "../../constant";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "reader",
  security_que: "In what city were you born?",
  security_ans: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    name,
    username,
    password,
    confirmPassword,
    role,
    security_que,
    security_ans,
  } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwrods do not match");
      return;
    }
    if (!(role && security_que)) {
      alert("please seclect role and security question");
      return;
    }
    try {
      const response = await createUser(formFields);
      if (response.success) {
        alert(response.message);
        resetFormField();
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("user creation encountered an error", error);
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Register to continue</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          onChange={handleChange}
          name="name"
          value={name}
        />
        <FormInput
          label="Username"
          type="text"
          required
          onChange={handleChange}
          name="username"
          value={username}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <SelectInput
          // label="Select Role"
          required
          onChange={handleChange}
          name="role"
          value={role}
          options={Role}
        />
        <SelectInput
          // label="Select Security Question"
          required
          onChange={handleChange}
          name="security_que"
          value={security_que}
          options={SecurityQuestion}
        />
        <FormInput
          label="Securtiy Answer"
          type="text"
          required
          onChange={handleChange}
          name="security_ans"
          value={security_ans}
        />
        <Button type="submit">Register User</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
