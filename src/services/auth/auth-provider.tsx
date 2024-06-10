/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation } from "@apollo/client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LOGIN } from "../graphql/mutations/login";

type AuthContextType = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthenticating: false,
  login: async () => {},
  logout: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signIn, { data }] = useMutation(LOGIN);

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

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthenticationLoading(true);
      try {
        await signIn({ variables: { email, password } });
      } catch (error) {
        console.error(error);
        setAuthenticationLoading(false);
      }
      setAuthenticationLoading(false);
    },
    [signIn]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  useEffect(() => {
    verifyTokenExists();
  }, [verifyTokenExists]);

  useEffect(() => {
    if (data?.login?.jwt) {
      setToken(data.login.jwt);
    }
  }, [data?.login?.jwt, setToken]);

  const provide = useMemo(
    () => ({
      isAuthenticated,
      isAuthenticating,
      login,
      logout,
    }),
    [isAuthenticated, isAuthenticating, login, logout]
  );

  return (
    <AuthContext.Provider value={provide}>{children}</AuthContext.Provider>
  );
};
