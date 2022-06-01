import axios from "axios";
import { useState } from "react";

type FormInputProps = {
  disable: boolean;
  password: string;
  passwordRepeat: string;
  email: string;
  username: string;
};

export type FormBodyProps = {
  password: string;
  email: string;
  username: string;
};

export type FormResponseProps = {
  error: string;
};

export const apiUrl = "/api/1.0/users";
export default function SignUpPage() {
  const [formInput, setFormInput] = useState<FormInputProps>({
    disable: true,
    password: "",
    passwordRepeat: "",
    email: "",
    username: "",
  });
  const handleSubmit = () => {
    const { username, email, password } = formInput;
    axios.post<FormBodyProps>(apiUrl, {
      username,
      email,
      password,
    });
    // fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     email,
    //     password,
    //   }),
    // });
  };

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const passwordRepeat =
      id === "passwordRepeat" ? value : formInput.passwordRepeat;
    const password = id === "password" ? value : formInput.password;
    setFormInput(({ ...prev }) => ({
      ...prev,
      disable: password !== passwordRepeat || passwordRepeat == "",
      [id]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleInputOnChange}
          value={formInput.username}
          id="username"
        />
        <label htmlFor="email">E-mail</label>
        <input
          onChange={handleInputOnChange}
          value={formInput.email}
          id="email"
          type={"email"}
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInputOnChange}
          id="password"
          type="password"
          value={formInput.password}
        />
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input
          onChange={handleInputOnChange}
          id="passwordRepeat"
          type="password"
          value={formInput.passwordRepeat}
        />
        <button onClick={handleSubmit} disabled={formInput.disable}>
          Sign Up
        </button>
      </form>
    </>
  );
}
