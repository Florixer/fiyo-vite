import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import matchMedia from "matchmedia";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CustomTopNavbar from "@/layout/items/CustomTopNavbar";
import InboxList from "@/components/direct/InboxList";
import UserFilesSheet from "@/components/direct/chat/UserFilesSheet";
import UserContext from "@/context/user/UserContext";
import SocketContext from "@/context/socket/SocketContext";

const Chat = () => {
  const { socket } = useContext(SocketContext);
  const { userInfo, inboxItems } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const inputMessageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isUserFilesSheetOpen, setIsUserFilesSheetOpen] = useState(false);
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

  const { currentRoomId } = useParams();
  const { socketUser } = useSocket();

  document.title = ` Chats • Flexiyo`;

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: userInfo.username, message: inputText },
      ]);
      socket.emit(
        "send-message",
        roomId,
        userInfo.avatar,
        userInfo.username,
        inputText,
      );
      saveMessage({ sender: userInfo.username, message: inputText });
      setInputText("");
      inputMessageRef.current.focus();
    }
  };

  // Automatic Scrolling
  useEffect(() => {
    const scrollToBottom = () => {
      setTimeout(() => {
        const scrollableDiv = document.getElementById("chat-messages");
        if (scrollableDiv) {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
      }, 0);
    };
    scrollToBottom();
  }, [messages]);

  const openUserFilesSheet = () => {
    setIsUserFilesSheetOpen(true);
  };

  const closeUserFilesSheet = () => {
    setIsUserFilesSheetOpen(false);
  };

  return (
    <section id="chat">
      <UserFilesSheet
        openUserFilesSheet={openUserFilesSheet}
        isUserFilesSheetOpen={isUserFilesSheetOpen}
        setIsUserFilesSheetOpen={setIsUserFilesSheetOpen}
      />
      {!isMobile && <InboxList />}
      <div className="chat-area">
        <CustomTopNavbar
          navbarPrevPage={isMobile ? "/direct/inbox" : null}
          navbarCover={recepient.cover}
          navbarTitle={recepient.name}
          navbarFirstIcon="fa fa-phone"
          navbarSecondIcon="fa fa-video"
          setBorder={true}
        />
        <div
          className="chat-messages"
          id="chat-messages"
          onClick={closeUserFilesSheet}
        >
          <div className="flex flex-col items-center gap-2 mt-5">
            <LazyLoadImage
              src={recepient.pfp}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full object-cover"
            />
            <b className="text-sm">{recepient.name}</b>
            <div className="text-xs">Flexiyo • @{recepient.username}</div>
            <button className="fm-primary-btn-inverse rounded-lg p-2 my-2">
              View Profile
            </button>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message--${
                message.sender !== userInfo.username ? "other" : "self"
              }`}
            >
              {message.sender !== userInfo.username && (
                <LazyLoadImage
                  src={recepient.pfp}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Profile Picture"
                />
              )}
              <span msg-type="text">{message.message}</span>
            </div>
          ))}
        </div>
        <div className="chat-messenger">
          <form className="chat-messenger-box" onSubmit={handleSendMessage}>
            <div className="chat-messenger--left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                onClick={openUserFilesSheet}
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="chat-messenger--center">
              <input
                ref={inputMessageRef}
                type="text"
                placeholder="Message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            <button
              className="chat-messenger--right"
              type="submit"
              disabled={!inputText}
            >
              <i className="fa fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
