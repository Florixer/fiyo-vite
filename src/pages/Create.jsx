import React from "react";
import matchMedia from "matchmedia";
import ContentViewport from "@/components/create/ContentViewport";
import ContentSelection from "@/components/create/ContentSelection";
const Create = () => {
  document.title = "Flexiyo";

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 950px)");
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
    <section id="create">
      <div
        className="create-container"
        style={{ flexDirection: isMobile ? "column" : "row" }}
      >
        
        <ContentViewport />
        <ContentSelection />
      </div>
    </section>
  );
};

export default Create;
