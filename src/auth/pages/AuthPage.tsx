import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/providers/auth/auth-provider";

function AuthPage(): React.ReactElement {
  const { isAuthenticated, login, isAuthenticating } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await login(email, password);
    if (isAuthenticated) {
      // TODO: it is not redirecting at the first time
      navigate("/");
    }
  };

  if (isAuthenticating) return <div>Submitting...</div>;

  // if (error) return <div>Submission error! {error.message}</div>;

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

export default AuthPage;
