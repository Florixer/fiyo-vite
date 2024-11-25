import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
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
import LoadingScreen from "./components/app/LoadingScreen";
import UserContext from "./context/user/UserContext";

const App = () => {
  document.title = "Flexiyo";
  const [appLoading, setAppLoading] = useState(true);
  const { loading } = useContext(UserContext);

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

  if (appLoading || loading) {
    return <LoadingScreen />;
  }

  return (
      <BrowserRouter>
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
          <Route exact path="/search" lazy={true} element={<Search />} />
          <Route exact path="/music" lazy={true} element={<Music />} />
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
                <Clips />
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
      </BrowserRouter>
  );
};

export default App;
