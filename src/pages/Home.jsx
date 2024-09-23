import React from "react";
import matchMedia from "matchmedia";
import TodayPicks from "@/components/home/TodayPicks";
import Post from "@/components/home/Post";
import HomeNavbar from "@/layout/items/HomeNavbar";
export default function Home() {
  document.title = "Flexiyo";

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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
    <>
      <section id="home">
      {isMobile ? <HomeNavbar /> : null}
        <div className="home-container">
          <TodayPicks />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </section>
    </>
  );
}
