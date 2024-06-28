import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const navigate = useNavigate();

  const login = (token) => {
    // Decode token to get user information
    const decodedToken = jwtDecode(token);
    setIsLoggedIn(true);
    // Set isAdmin based on token content
    setIsAdmin(decodedToken.isAdmin);
    setMemberId(decodedToken.memberId);
    // Set token in cookies
    Cookies.set("token", token, {
      expires: 1, // Expires in 1 day
      secure: true, // HTTPS only
      sameSite: "lax", // Adjust as necessary
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setMemberId(null);
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, login, logout, memberId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
