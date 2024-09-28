import { useState, useEffect } from "react";
import splashImage from "@/assets/media/img/splash.png";

const LoadingScreen = () => {
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        padding: isMobile ? "0" : "0 4rem 0 0",
      }}
    >
      <img
        src={splashImage}
        alt="Loading..."
        style={{ maxWidth: "100%", maxHeight: "80%", backgroundSize: "cover" }}
      />
    </div>
  );
};

export default LoadingScreen;
