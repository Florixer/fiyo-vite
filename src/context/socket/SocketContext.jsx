import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createSocket } from "@/hooks/user/useSocketService.js";
import UserContext from "@/context/user/UserContext";

const SOCKET_URL = import.meta.env.VITE_FIYOCHAT_SRV_BASE_URI;

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { userInfo, isUserAuthenticated } = useContext(UserContext);
  const [socketUser, setSocketUser] = useState({
    id: null,
  });
  const [inboxItems, setInboxItems] = useState([]);

  const socketRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!isUserAuthenticated) {
      if (socketRef.current) {
        console.log("Disconnecting socket for unauthenticated user");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (!socketRef.current) {
      console.log("Creating new socket connection");
      socketRef.current = createSocket(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
        auth: {
          fiyoat: userInfo.tokens.at,
        },
      });

      if (!initialized.current) {
        socketRef.current.on("connect", () => {
          console.log("Socket Connected:", socketRef.current.id);
          setSocketUser((prevState) => ({
            ...prevState,
            id: socketRef.current.id,
          }));
        });

        socketRef.current.on("roomsListResponse", (response) => {
          console.log(response);
          setInboxItems(response);
        });

        socketRef.current.on("disconnect", () => {
          console.log("Socket Disconnected:", socketRef.current.id);
        });

        initialized.current = true;
      }
    }
  }, [isUserAuthenticated, userInfo, socketUser.joinedRoomIds]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        socketUser,
        inboxItems,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
