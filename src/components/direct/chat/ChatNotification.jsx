import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/user/UserContext";
import { useSocket } from "@/context/socket/SocketContext";

const ChatNotification = () => {
  const { userInfo } = useContext(UserContext);
  const { socket } = useSocket();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (avatar, username, message) => {
      if (userInfo.username === username) return;
      setNotification({ cover: avatar, title: username, content: message });
      setTimeout(() => {
        setNotification(null);
      }, 2500);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, userInfo.username]);

  return (
    <div
      className={`fixed flex justify-around items-center w-full top-[-5rem] h-20 p-3 bg-[--fm-tertiary-bg-color] z-50 transition-all duration-200 ease-in-out ${
        notification ? "top-0" : ""
      }`}
    >
      {notification && (
        <>
          <img
            src={notification.cover}
            className="w-14 h-14 rounded-full"
            alt="Notification Cover"
          />
          <div className="flex flex-col w-full mx-4">
            <span className="text-[--fm-primary-text] text-base overflow-hidden whitespace-nowrap overflow-ellipsis w-9/10">
              {notification.title}
            </span>
            <span className="text-gray-400 text-base truncate whitespace-nowrap overflow-hidden w-9/10 mt-1.5">
              {notification.content}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatNotification;
