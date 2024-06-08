import { useMutation } from "@apollo/client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LOGIN } from "../../graphql/mutations/login";

type AuthContextType = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthenticating: false,
  login: async (email: string, password: string) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signIn, { data, loading, error }] = useMutation(LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticationLoading] = useState(true);

  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  const setToken = useCallback((token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  }, []);

  const verifyTokenExists = useCallback(() => {
    setAuthenticationLoading(true);
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setAuthenticationLoading(false);
  }, [getToken]);

  useEffect(() => {
    verifyTokenExists();
  }, [verifyTokenExists]);

  useEffect(() => {
    if (data?.login?.jwt) {
      setToken(data.login.jwt);
    }
  }, [data?.login?.jwt, setToken]);

  const login = async (email: string, password: string) => {
    try {
      await signIn({ variables: { email, password } });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthenticating, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
