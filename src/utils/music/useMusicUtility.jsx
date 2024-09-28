import { useContext, useEffect, useCallback } from "react";
import axios from "axios";
import MusicContext from "@/context/music/MusicContext";

const useMusicUtility = () => {
  const {
    audioRef,
    currentTrack,
    setCurrentTrack,
    loopAudio,
    setIsAudioLoading,
    contentQuality,
    setIsAudioPlaying,
  } = useContext(MusicContext);

  const saavnApiBaseUrl = "https://fiyo-saavn.vercel.app/api";

  const getTrackData = async (trackId) => {
    try {
      const { data } = await axios.get(`${saavnApiBaseUrl}/songs/${trackId}`);
      const resultData = data.data[0];
      const trackData = {
        id: resultData.id,
        name: resultData.name,
        album: resultData.album.name,
        artists: resultData.artists.primary
          .map((artist) => artist.name)
          .join(", "),
        image:
          contentQuality === "low"
            ? resultData.image[0].url
            : contentQuality === "normal"
            ? resultData.image[1].url
            : contentQuality === "high"
            ? resultData.image[2].url
            : resultData.image[1].url,
        link:
          contentQuality === "low"
            ? resultData.downloadUrl[1].url
            : contentQuality === "normal"
            ? resultData.downloadUrl[3].url
            : contentQuality === "high"
            ? resultData.downloadUrl[4].url
            : resultData.downloadUrl[3].url,
        hasLyrics: resultData.hasLyrics,
      };
      return trackData;
    } catch (error) {
      return null;
    }
  };

  const getTrack = async (trackId) => {
    setIsAudioLoading(true);
    const cachedTracks = JSON.parse(
      localStorage.getItem("cachedTracks") || "{}",
    );

    if (cachedTracks[trackId]) {
      const cachedTrackData = cachedTracks[trackId];
      setCurrentTrack({
        id: trackId,
        name: cachedTrackData.name,
        album: cachedTrackData.album,
        artists: cachedTrackData.artists,
        image: cachedTrackData.image,
        link: cachedTrackData.link,
        hasLyrics: cachedTrackData.hasLyrics,
      });
      setIsAudioLoading(false);
    } else {
      const trackData = await getTrackData(trackId);
      setCurrentTrack(trackData);
      cacheTrackData(trackData);
      setIsAudioLoading(false);
    }
  };

  const getTrackLyrics = async () => {
    let currentTrackLyrics;
    if (currentTrack.hasLyrics) {
      const { data } = await axios.get(
        `${saavnApiBaseUrl}/songs/${currentTrack.id}/lyrics`,
      );
      return {
        trackId: currentTrack.id,
        lyrics: data.data.lyrics.replace("<br>", "<br/>"),
      };
    } else {
      try {
        const { data } = await axios.get(
          `https://lyrist.vercel.app/api/${
            currentTrack.name
          }/${currentTrack.artists.split(",")[0].trim()}`,
        );
        if (data.lyrics) {
          return {
            trackId: currentTrack.id,
            lyrics: data.lyrics,
          };
        } else return null;
      } catch (error) {
        console.error(error.message);
        return null;
      }
    }
  };

  const cacheTrackData = async (trackData) => {
    const cachedTracks = JSON.parse(
      localStorage.getItem("cachedTracks") || "{}",
    );
    cachedTracks[trackData.id] = trackData;
    localStorage.setItem("cachedTracks", JSON.stringify(cachedTracks));
  };

  const deleteCachedAudioData = async () => {
    try {
      localStorage.removeItem("cachedTracks");
      alert("Cached Audio Data deleted successfully");
    } catch (e) {
      console.error("Unable to delete Cached Audio Data", e);
    }
  };

  const handleAudioPlay = useCallback(() => {
    const audio = audioRef.current;
    audio.play();
    setIsAudioPlaying(true);
  }, []);

  const handleAudioPause = useCallback(() => {
    const audio = audioRef.current;
    audio.pause();
    setIsAudioPlaying(false);
  }, []);

  const handleNextAudioTrack = useCallback(
    async (callType) => {
      const audio = audioRef.current;
      try {
        const trackIdToFetch = await getSuggestedTrackId();
        if (loopAudio && callType === "auto") {
          audio.currentTime = 0;
          audio.play();
          setIsAudioPlaying(true);
          await getTrack(currentTrack.id);
        } else if ((!loopAudio && callType === "auto") || callType !== "auto") {
          audio.currentTime = 0;
          audio.pause();
          setIsAudioPlaying(false);
          await getTrack(trackIdToFetch);
        } else {
        }
      } catch (error) {
        console.error("Error handling next track:", error);
      }
    },
    [getTrack],
  );

  const getSuggestedTrackId = async () => {
    const { data } = await axios.get(
      `${saavnApiBaseUrl}/songs/${currentTrack.id}/suggestions`,
      { params: { limit: 5 } },
    );
    const suggestedTrackId = data.data[Math.floor(Math.random() * 5)].id;
    return suggestedTrackId;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (currentTrack.id) {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: currentTrack.name,
          artist: currentTrack.artists,
          album: currentTrack.album,
          artwork: [
            {
              src: currentTrack.image.replace(/(50x50|150x150)/, "500x500"),
              sizes: "500x500",
              type: "image/jpg",
            },
          ],
        });

        navigator.mediaSession.setActionHandler("play", handleAudioPlay);

        navigator.mediaSession.setActionHandler("pause", handleAudioPause);

        navigator.mediaSession.setActionHandler(
          "nexttrack",
          handleNextAudioTrack,
        );

        navigator.mediaSession.setActionHandler("stop", () => {
          audio.pause();
          setIsAudioPlaying(false);
        });
      }
    }
  }, [currentTrack, handleAudioPlay, handleAudioPause, handleNextAudioTrack]);

  return {
    getTrackData,
    getTrack,
    getTrackLyrics,
    deleteCachedAudioData,
    handleAudioPlay,
    handleAudioPause,
    handleNextAudioTrack,
  };
};

export default useMusicUtility;
