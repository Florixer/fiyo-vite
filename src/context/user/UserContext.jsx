import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create UserContext
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);
  const [userInfo, setUserInfo] = useState({
  id: "dcb5951d-bceb-40ab-be6c-cf689b833ab2",
  full_name: "Demo Person",
  username: "demo-person",
  email: null,
  gender: null,
  dob: null,
  profession: null,
  origin: {
    ip: "157.35.0.232",
    city: "Patna",
    country: "India",
    timezone: "Asia/Kolkata",
    continent: "Asia",
    subdivision: "Bihar"
  },
  bio: "Hi, I am new here on Flexiyo!",
  account_type: "personal",
  is_private: true,
  avatar: "https://cdnfiyo.github.io/img/user/avatars/default-avatar.jpg",
  banner: "https://cdnfiyo.github.io/img/user/avatars/default-banner.jpg"
});
      const [loading, setLoading] = useState(true);

      useEffect(() => {
  const savedUserInfo = Cookies.get("userInfo");
  if (savedUserInfo) {
    setUserInfo(JSON.parse(savedUserInfo));
    setIsUserAuthenticated(true);
  }
  setLoading(false);
}, []);

useEffect(() => {
  if (userInfo) {
    const { password, ...userInfoWithoutPassword } = userInfo;
    Cookies.set("userInfo", JSON.stringify(userInfoWithoutPassword), {
      expires: 3650,
    });
  } else {
    Cookies.remove("userInfo");
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
