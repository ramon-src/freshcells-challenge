import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN } from "../service/graphql/mutations/login";

function Login(): React.ReactElement {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: any) {
    e.preventDefault();
    login({ variables: { email, password } });
  }

  if (data) {
    localStorage.setItem("token", data.login.jwt);
  }

  if (loading) return <div>Submitting...</div>;

  if (error) return <div>Submission error! {error.message}</div>;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
