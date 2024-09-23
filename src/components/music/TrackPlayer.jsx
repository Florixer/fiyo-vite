import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import useMusicUtility from "@/utils/music/useMusicUtility";
import MusicContext from "@/context/music/MusicContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TrackPlayer = () => {
  const {
    currentTrack,
    audioRef,
    isAudioLoading,
    setIsAudioLoading,
    isAudioPlaying,
    setIsAudioPlaying,
    audioProgress,
    setAudioProgress,
    setIsTrackDeckModalOpen,
  } = useContext(MusicContext);
  const { getTrack, handleAudioPlay, handleAudioPause, handleNextAudioTrack } =
    useMusicUtility();
  const location = useLocation();
  const [isMusicRoute, setIsMusicRoute] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartPosition, setTouchStartPosition] = useState(0);

  const playAudioBtnRef = useRef(null);

  useEffect(() => {
    // if (!currentTrack.id) {
    //   return;
    // }

    if (location.pathname === "/music") {
      setIsMusicRoute(true);
    } else {
      setIsMusicRoute(false);
    }
  }, [currentTrack.id, location.pathname, setIsMusicRoute]);

  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        const newPosition = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(newPosition);
      }
    };

    const handleEnded = () => {
      handleNextAudioTrack("auto");
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, setAudioProgress, handleNextAudioTrack, isDragging]);

  const handleProgressBarClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    const newPosition = (e.nativeEvent.offsetX / progressBar.clientWidth) * 100;
    setAudioProgress(newPosition);
    audio.currentTime = (newPosition / 100) * audio.duration;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setTouchStartPosition(e.touches[0].clientX);
    return touchStartPosition;
  };

  const handleTouchMove = useCallback(
    (e) => {
      if (isDragging) {
        const audio = audioRef.current;
        const progressBar = progressBarRef.current;
        const touchPosition = e.touches[0].clientX;
        const progressBarRect = progressBar.getBoundingClientRect();
        const newPosition =
          ((touchPosition - progressBarRect.left) / progressBarRect.width) *
          100;

        const clampedPosition = Math.max(0, Math.min(100, newPosition));

        setAudioProgress(clampedPosition);
        audio.currentTime = (clampedPosition / 100) * audio.duration;

        if (
          touchPosition < progressBarRect.left ||
          touchPosition > progressBarRect.right
        ) {
          setIsDragging(false);
        }
      }
    },
    [audioRef, setAudioProgress, isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      const audio = audioRef.current;
      setIsDragging(false);
      if (isAudioPlaying) {
        audio.play();
      }
    }
  }, [audioRef, isDragging, isAudioPlaying]);

  useEffect(() => {
    const handleGlobalTouchMove = (e) => {
      handleTouchMove(e);
    };
    const handleGlobalTouchEnd = () => {
      handleTouchEnd();
    };

    document.addEventListener("touchmove", handleGlobalTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", handleGlobalTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    const audio = audioRef.current;
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight") {
        setAudioProgress(audioProgress + 5);
        audio.currentTime = audio.currentTime + 5;
      } else if (event.ctrlKey && event.code === "Space") {
        event.preventDefault();
        if (audio.paused) {
          handleAudioPlay();
        } else {
          handleAudioPause();
        }
      } else if (event.code === "ArrowLeft") {
        setAudioProgress(audioProgress - 5);
        audio.currentTime = audio.currentTime - 5;
      }
    });
  }, [handleAudioPlay, handleAudioPause]);

  useEffect(() => {
    const playAudio = async () => {
      // setIsAudioLoading(true);
      if (currentTrack.link) {
        try {
          const audio = audioRef.current;
          audio.src = currentTrack.link;
          await audio.play();
          setIsAudioPlaying(true);
          setIsAudioLoading(false);
        } catch (error) {
          console.error("Error playing audio:", error);
          setIsAudioPlaying(false);
          setIsAudioLoading(false);
        }
      }
    };
    playAudio();
  }, [currentTrack.link]);

  return currentTrack.id ? (
    <div className="track-player">
      <div className="track-player-box">
        <div
          className="track-player--image"
          onClick={() => setIsTrackDeckModalOpen(true)}
        >
          <LazyLoadImage src={currentTrack.image} alt="player-image" />
        </div>
        <div className="track-player--details">
          <span
            className="track-player--details-name"
            onClick={() => setIsTrackDeckModalOpen(true)}
          >
            {currentTrack.name}
          </span>
          <span
            className="track-player--details-artists"
            onClick={() => setIsTrackDeckModalOpen(true)}
          >
            {currentTrack.artists}
          </span>
          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              width: "90%",
              height: "4px",
              backgroundColor: "#4e4e4e",
              borderRadius: "5px",
              margin: "6px 0",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                height: "4px",
                borderRadius: "4px",
                backgroundColor: "#1ED760",
                width: `${audioProgress}%`,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "-3px",
                left: `${audioProgress}%`,
                transform: "translateX(-50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
              }}
            ></div>
          </div>
        </div>
        <div className="track-player--controls">
          <span className="track-player--controls-item">
            {isAudioLoading && (
              <div className="track-player--controls-preloader"></div>
            )}
            {isAudioPlaying && !isAudioLoading ? (
              <svg
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                onClick={handleAudioPause}
              >
                <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              </svg>
            ) : (
              <svg
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                ref={playAudioBtnRef}
                onClick={() => {
                  handleAudioPlay();
                  if (!currentTrack.link) {
                    getTrack(currentTrack.id);
                  }
                }}
              >
                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
              </svg>
            )}
          </span>
          <span
            className="track-player--controls-item"
            onClick={handleNextAudioTrack}
          >
            <svg role="img" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default TrackPlayer;
