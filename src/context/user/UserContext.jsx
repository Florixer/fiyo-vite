import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create UserContext
const UserContext = createContext(null);

const generateUsername = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890._";
  let username = "demo-";
  for (let i = 0; i < 5; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  return username;
};

export const UserProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);
  const [userInfo, setUserInfo] = useState({
    id: "dcb5951d-bceb-40ab-be6c-cf689b833ab2",
    full_name: "Demo Person",
    username: null,
    email: null,
    gender: null,
    dob: null,
    profession: null,
    origin: null,
    bio: "Hi, I am new here on Flexiyo!",
    account_type: "personal",
    is_private: true,
    avatar: "https://cdnfiyo.github.io/img/user/avatars/default-avatar.jpg",
    banner: "https://cdnfiyo.github.io/img/user/banners/default-banner.jpg",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUserInfo = Cookies.get("userInfo");

    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsUserAuthenticated(true);
    } else {
      const newUsername = generateUsername();
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        username: newUsername,
      }));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.username) {
      const { password, ...userInfoWithoutPassword } = userInfo;
      Cookies.set("userInfo", JSON.stringify(userInfoWithoutPassword), {
        expires: 3650,
      });
    }
  }, [userInfo]);

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
