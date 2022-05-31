import { useState } from "react";

type PasswordInputProps = {
  disable: boolean;
  password: string;
  passwordRepeat: string;
};

export default function SignUpPage() {
  const [passwordInput, setPasswordInput] = useState<PasswordInputProps>({
    disable: true,
    password: "",
    passwordRepeat: "",
  });
  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordInput(({ passwordRepeat }) => ({
      disable: event.target.value !== passwordRepeat,
      password: event.target.value,
      passwordRepeat,
    }));
  };
  const handlePasswordRepeatInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordInput(({ password }) => ({
      disable: event.target.value !== password,
      password: password,
      passwordRepeat: event.target.value,
    }));
  };

  return (
    <>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input id="username" />
      <label htmlFor="email">E-mail</label>
      <input id="email" type={"email"} />
      <label htmlFor="password">Password</label>
      <input
        onChange={handlePasswordInputChange}
        id="password"
        type="password"
      />
      <label htmlFor="passwordRepeat">Password Repeat</label>
      <input
        onChange={handlePasswordRepeatInputChange}
        id="passwordRepeat"
        type="password"
      />
      <button disabled={passwordInput.disable}>Sign Up</button>
    </>
  );
}
