import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createSocket } from "@/hooks/user/useSocketService";
import UserContext from "@/context/user/UserContext";

const SOCKET_URL = "https://fm-server.2xtf.onrender.com";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { userInfo, isUserAuthenticated } = useContext(UserContext);
  const [socketUser, setSocketUser] = useState({
    id: null,
    joinedRoomIds: [2963293620915324, 2963293620915325],
  });

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
      });

      if (!initialized.current) {
        socketRef.current.on("connect", () => {
          console.log("Socket Connected:", socketRef.current.id);
          setSocketUser((prevState) => ({
            ...prevState,
            id: socketRef.current.id,
          }));
          // if (userInfo.username) {  TODO: To implement in production
          if (userInfo) {
            console.log("Emitting join-rooms with:", socketUser.joinedRoomIds);
            socketRef.current.emit(
              "join-rooms",
              socketUser.joinedRoomIds,
              socketRef.current.id,
              userInfo.username,
            );
          }
        });

        socketRef.current.on("disconnect", () => {
          console.log("Socket Disconnected:", socketRef.current.id);
        });

        initialized.current = true;
      }
    }
  }, [isUserAuthenticated, userInfo, socketUser.joinedRoomIds]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, socketUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
