import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserProvider } from "./user/UserContext";
import { SocketProvider } from "./socket/SocketContext";
import { MusicProvider } from "./music/MusicContext";
import { CreateProvider } from "./create/CreateContext";

const ContextProviders = ({ children }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <SocketProvider>
          <MusicProvider>
            <CreateProvider>{children}</CreateProvider>
          </MusicProvider>
        </SocketProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default ContextProviders;
