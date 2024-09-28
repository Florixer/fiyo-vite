import { useState, useEffect, useContext } from "react";
import matchMedia from "matchmedia";
import BottomNavbar from "./items/BottomNavbar";
import SideNavbar from "./items/SideNavbar";
import UserContext from "@/context/user/UserContext";

const Navbar = () => {
  const { isUserAuthenticated } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 600px)");
    const handleMediaQueryChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return isUserAuthenticated ? (
    <>
      {isMobile ? (
        <>
          <BottomNavbar />
        </>
      ) : (
        <SideNavbar />
      )}
    </>
  ) : null;
};

export default Navbar;
