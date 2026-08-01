import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const hasProcessedGithubCode = useRef(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const saveAuth = (newToken, newUser) => {
    try {
      localStorage.setItem("token", newToken);
    } catch (err) {
      console.error("localStorage.setItem threw:", err);
    }
    setToken(newToken);
    setUser(newUser);
  };

  const signup = async (formData) => {
    clearAuthError();
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.post(
        `${API_BASE}/api/users/createUser`,
        formData,
      );
      saveAuth(res.data.data.token, res.data.data);
      navigate("/dashboard");
    } catch (error) {
      console.log("Sign up failed", error);
      throw error;
    }
  };

  const signin = async (formData) => {
    clearAuthError();
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.post(`${API_BASE}/api/users/loginUser`, formData);
      saveAuth(res.data.token, res.data.userInfo);
      navigate("/dashboard");
    } catch (error) {
      console.log("Log in failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/signin");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      clearAuthError();
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.post(`${API_BASE}/api/users/google`, {
          access_token: tokenResponse.access_token,
        });
        saveAuth(res.data.token, res.data.user);

        navigate("/dashboard");
      } catch (error) {
        setAuthError(error.response?.data?.message || "Google login failed");
      }
    },
    onError: () => setAuthError("Google login failed"),
  });

  const githubLogin = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
      scope: "read:user user:email",
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;
    if (hasProcessedGithubCode.current) return;
    hasProcessedGithubCode.current = true;

    const handleGithubCallback = async () => {
      clearAuthError();
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      try {
        const res = await axios.post(`${API_BASE}/api/users/github`, { code });
        saveAuth(res.data.token, res.data.user);
        window.history.replaceState({}, "", window.location.pathname);
        navigate("/dashboard");
      } catch (error) {
        setAuthError(error.response?.data?.message || "Github login failed");
      }
    };

    handleGithubCallback();
  }, []);

  const fetchUser = async (currentToken) => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.get(`${API_BASE}/api/users/getUser`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      setUser(res.data.data);
    } catch (error) {
      console.log("Failed to fetch user", error);
      logout();
    }
  };

  const hasFetchedUser = useRef(false);

  useEffect(() => {
    if (hasFetchedUser.current) return;
    hasFetchedUser.current = true;

    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      fetchUser(existingToken).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleLogin,
        githubLogin,
        signin,
        signup,
        setLoading,
        user,
        token,
        logout,
        authError,
        clearAuthError,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
