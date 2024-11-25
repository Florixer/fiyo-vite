import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CustomTopNavbar from "@/layout/items/CustomTopNavbar";
import InboxList from "@/components/direct/InboxList";
import UserFilesSheet from "@/components/direct/chat/UserFilesSheet";
import UserContext from "@/context/user/UserContext";
import { useSocket } from "@/context/socket/SocketContext";

const Chat = () => {
  const { socket } = useSocket();
  const { userInfo } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isUserFilesSheetOpen, setIsUserFilesSheetOpen] = useState(false);
  const { currentRoomId } = useParams();
  const inputMessageRef = useRef(null);

  useEffect(() => {
    if (!socket || !currentRoomId) return;

    // Fetch messages for the room
    socket.emit("get_messages", { roomId: currentRoomId });

    const handleReceiveMessages = (messages) => {
      setMessages(messages);
    };

    const handleNewMessage = ({ senderId, message, messageId }) => {
      setMessages((prev) => [...prev, { senderId, message, messageId }]);
    };

    const handleEditMessage = ({ messageId, updatedMessage }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId ? { ...msg, message: updatedMessage } : msg
        )
      );
    };

    const handleDeleteMessage = ({ messageId }) => {
      setMessages((prev) => prev.filter((msg) => msg.messageId !== messageId));
    };

    const handleReactToMessage = ({ messageId, reaction }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId
            ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
            : msg
        )
      );
    };

    const handleUnreactToMessage = ({ messageId, reaction }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId
            ? { ...msg, reactions: (msg.reactions || []).filter((r) => r !== reaction) }
            : msg
        )
      );
    };

    socket.on("messages", handleReceiveMessages);
    socket.on("message_received", handleNewMessage);
    socket.on("message_edited", handleEditMessage);
    socket.on("message_unsent", handleDeleteMessage);
    socket.on("message_reacted", handleReactToMessage);
    socket.on("message_unreacted", handleUnreactToMessage);

    return () => {
      socket.off("messages", handleReceiveMessages);
      socket.off("message_received", handleNewMessage);
      socket.off("message_edited", handleEditMessage);
      socket.off("message_unsent", handleDeleteMessage);
      socket.off("message_reacted", handleReactToMessage);
      socket.off("message_unreacted", handleUnreactToMessage);
    };
  }, [socket, currentRoomId]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!inputText.trim() || !currentRoomId) return;

    const messageId = Date.now(); // Temporary ID before backend assigns one
    socket.emit("send_message", {
      roomId: currentRoomId,
      senderId: userInfo.userId,
      message: inputText,
      messageId,
    });

    setMessages((prev) => [
      ...prev,
      { senderId: userInfo.userId, message: inputText, messageId },
    ]);
    setInputText("");
    inputMessageRef.current.focus();
  };

  const handleEditMessage = (messageId, newMessage) => {
    socket.emit("edit_message", {
      roomId: currentRoomId,
      senderId: userInfo.userId,
      messageId,
      updatedMessage: newMessage,
    });
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit("unsend_message", {
      roomId: currentRoomId,
      senderId: userInfo.userId,
      messageId,
    });
  };

  const handleReactToMessage = (messageId, reaction) => {
    socket.emit("react_to_message", {
      roomId: currentRoomId,
      senderId: userInfo.userId,
      messageId,
      reaction,
    });
  };

  const handleUnreactToMessage = (messageId, reaction) => {
    socket.emit("unreact_to_message", {
      roomId: currentRoomId,
      senderId: userInfo.userId,
      messageId,
      reaction,
    });
  };

  return (
    <section id="chat">
      <UserFilesSheet
        isUserFilesSheetOpen={isUserFilesSheetOpen}
        setIsUserFilesSheetOpen={setIsUserFilesSheetOpen}
      />
      <InboxList />
      <div className="chat-area">
        <CustomTopNavbar navbarTitle="Chat Room" setBorder={true} />
        <div className="chat-messages" id="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message--${
                msg.senderId === userInfo.userId ? "self" : "other"
              }`}
            >
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
        <div className="chat-messenger">
          <form onSubmit={handleSendMessage}>
            <input
              ref={inputMessageRef}
              type="text"
              placeholder="Type a message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" disabled={!inputText}>
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
