import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/user/UserContext";
import { useSocket } from "@/context/SocketProvider";

const ChatNotification = () => {
  const { userInfo } = useContext(UserContext);
  const { socket } = useSocket();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (avatar, username, message) => {
      if (userInfo?.username === username) return;
      setNotification({ cover: avatar, title: username, content: message });
      setTimeout(() => {
        setNotification(null);
      }, 2500);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, userInfo?.username]);

  return (
    <div className={`chat-notification ${notification ? "active" : ""}`}>
      {notification && (
        <>
          <div className="chat-notification--pfp">
            <img src={notification.cover} alt="notification-pfp" />
          </div>
          <div className="chat-notification--body">
            <span className="chat-notification--body-title">
              {notification.title}
            </span>
            <span className="chat-notification--body-content">
              {notification.content}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatNotification;
