import { useState, useEffect } from "react";
import matchMedia from "matchmedia";
import InboxList from "@/components/direct/InboxList";

const Inbox = () => {
  document.title = "Inbox • Chats";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
    <section
      id="inbox"
      style={{
        display: "flex",
        borderRight: ".01rem solid var(--fm-primary-border)",
      }}
    >
      {isMobile ? (
        <InboxList />
      ) : (
        <>
          <InboxList />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
              width: "100%",
            }}
          >
            <svg
              className="chat-icon"
              title="Chat with your mates"
              fill="#fff"
              role="img"
              viewBox="0 0 24 24"
              style={{
                width: "7rem",
                height: "7rem",
                padding: "1.5rem",
                border: ".2rem solid var(--fm-primary-text)",
                borderRadius: "50%",
              }}
            >
              <g fill="none" stroke="#ffffff" strokeWidth="1.5">
                <path d="M20 12c0-3.771 0-5.657-1.172-6.828C17.657 4 15.771 4 12 4C8.229 4 6.343 4 5.172 5.172C4 6.343 4 8.229 4 12v6c0 .943 0 1.414.293 1.707C4.586 20 5.057 20 6 20h6c3.771 0 5.657 0 6.828-1.172C20 17.657 20 15.771 20 12z"></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 10h6m-6 4h3"
                ></path>
              </g>
            </svg>
            <br />
            <p style={{ color: "var(--fm-primary-text-muted)" }}>
              Send a message to start a chat.
            </p>
            <br/>
            <button
              style={{
                padding: ".5rem .7rem",
                fontSize: ".7rem",
                border: "none",
                borderRadius: ".3rem",
                backgroundColor: "#0095f6",
              }}
            >
              Send Message
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Inbox;
