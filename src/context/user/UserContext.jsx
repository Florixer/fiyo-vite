import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
      setUserInfo(null);
    }

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUserAuthenticated,
        setIsUserAuthenticated,
        userInfo,
        setUserInfo,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;