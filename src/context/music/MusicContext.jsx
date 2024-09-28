import { createContext, useEffect, useState, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { Network as CapacitorNetwork } from "@capacitor/network";

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [contentQuality, setContentQuality] = useState("low");
  const [topTracks, setTopTracks] = useState({});
  const [loopAudio, setLoopAudio] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isTrackDeckModalOpen, setIsTrackDeckModalOpen] = useState(false);
  const [isNetworkConnected, setIsNetworkConnected] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      CapacitorNetwork.getStatus().then((status) => {
        setIsNetworkConnected(status.connected);
      });
      const handleNetworkStatusChange = (status) => {
        setIsNetworkConnected(status.connected);
      };

      CapacitorNetwork.addListener(
        "networkStatusChange",
        handleNetworkStatusChange,
      );
    } else {
      setIsNetworkConnected(navigator.onLine);
      window.addEventListener("online", () => {
        setIsNetworkConnected(true);
      });
      window.addEventListener("offline", () => {
        setIsNetworkConnected(false);
      });
    }

    return () => {
      CapacitorNetwork.removeAllListeners();
    };
  }, []);

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        currentTrack,
        setCurrentTrack,
        topTracks,
        setTopTracks,
        loopAudio,
        setLoopAudio,
        isAudioLoading,
        setIsAudioLoading,
        isAudioPlaying,
        setIsAudioPlaying,
        audioProgress,
        setAudioProgress,
        isTrackDeckModalOpen,
        setIsTrackDeckModalOpen,
        contentQuality,
        setContentQuality,
        isNetworkConnected,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
