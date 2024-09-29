import "./App.css";
import React, { useState, useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  Home,
  Search,
  Create,
  Clips,
  Profile,
  Music,
  DirectInbox,
  DirectChat,
  Stories,
  Notifications,
  AuthSignup,
  NotFound404,
} from "./pages";

import Navbar from "./layout/Navbar";
import TrackPlayer from "./components/music/TrackPlayer";
import DirectChatNotification from "./components/direct/chat/ChatNotification";
import { MusicProvider } from "./context/music/MusicContext";
import { CreateProvider } from "./context/create/CreateContext";
import UserContext, { UserProvider } from "./context/user/UserContext";
import { SocketProvider } from "./context/SocketProvider";
import LoadingScreen from "./components/app/LoadingScreen";

const App = () => {
  document.title = "Flexiyo";
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const noSelectElements = document.querySelectorAll("#main");
    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });

    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });

    const initializeApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setAppLoading(false);
    };

    initializeApp();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <UserContext.Consumer>
          {({ loading }) => {
            if (appLoading || loading) {
              return <LoadingScreen />;
            }
            return (
              <SocketProvider>
                <BrowserRouter>
                  <MusicProvider>
                    <CreateProvider>
                      <Navbar />
                      <DirectChatNotification />
                      <TrackPlayer />
                      <Routes>
                        <Route path="*" element={<NotFound404 />} />
                        <Route
                          exact
                          path="/auth/signup"
                          lazy={true}
                          element={<AuthSignup />}
                        />
                        <Route
                          index
                          exact
                          path="/"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <Home />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/search"
                          lazy={true}
                          element={<Search />}
                        />
                        <Route
                          exact
                          path="/music"
                          lazy={true}
                          element={<Music />}
                        />
                        <Route
                          exact
                          path="/stories"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <Stories />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/notifications"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <Notifications />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/direct/inbox"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <DirectInbox />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="direct/t/:currentRoomId"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <DirectChat />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/create"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <Create />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          exact
                          path="/clips"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <Clips />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/profile"
                          lazy={true}
                          element={
                            <ProtectedRoute>
                              <Profile />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </CreateProvider>
                  </MusicProvider>
                </BrowserRouter>
              </SocketProvider>
            );
          }}
        </UserContext.Consumer>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
