import React, { useState, useEffect, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import Modal from "react-modal";
import Headroom from "react-headroom";
import matchMedia from "matchmedia";
import CustomTopNavbar from "@/layout/items/CustomTopNavbar";
import TrackItem from "@/components/music/TrackItem";
import TrackDeck from "@/components/music/TrackDeck";
import MusicContext from "@/context/music/MusicContext";
import useMusicUtility from "@/utils/music/useMusicUtility";
import spotifyLogo from "@/assets/media/img/logo/spotifyLogo.svg";
import WebSpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

Modal.setAppElement("#root");
const Music = () => {
  const {
    topTracks,
    setTopTracks,
    currentTrack,
    isAudioPlaying,
    setIsAudioPlaying,
    setIsAudioLoading,
    setCurrentTrack,
    setLoopAudio,
    isTrackDeckModalOpen,
    setIsTrackDeckModalOpen,
  } = useContext(MusicContext);

  document.title = currentTrack.id
    ? `${currentTrack.name} - Flexiyo Music`
    : "Flexiyo Music";
  const location = useLocation();
  const navigate = useNavigate();

  const { getTrack, getTrackData, deleteCachedAudioData, handleAudioPause } =
    useMusicUtility();

  const fiyosaavnApiBaseUri = import.meta.env.VITE_FIYOSAAVN_API_BASE_URI;
  
  const [searchText, setSearchText] = useState("");
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  const [printError, setPrintError] = useState("");
  const [apiError, setApiError] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [modalDownloadData, setModalDownloadData] = useState("");
  const [isDownlodModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 950px)");
    const handleMediaQueryChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const searchTracks = useCallback(
    async (searchTerm) => {
      try {
        setApiLoading(true);
        const { data: response } = await axios.get(
          `${fiyosaavnApiBaseUri}/search/songs`,
          {
            params: {
              query: searchTerm,
              page: 1,
              limit: 30,
            },
          },
        );
        setTracks(response.data.results);
        setApiError(false);
        setApiLoading(false);
        return response.data.results;
      } catch (error) {
        setApiError(true);
        setPrintError(`${error.code} : ${error.message}`);
        setApiLoading(false);
      }
    },
    [fiyosaavnApiBaseUri],
  );

  const searchSpeechTracks = async (searchTerm) => {
    try {
      setApiLoading(true);
      const { data: response } = await axios.get(
        `${fiyosaavnApiBaseUri}/search/songs`,
        {
          params: {
            query: searchTerm,
            page: 1,
            limit: 30,
          },
        },
      );
      setTracks(response.data.results);
      getTrack(response.data.results[0].id);
      setApiError(false);
      setApiLoading(false);
    } catch (error) {
      setApiError(true);
      setPrintError(`${error.code} : ${error.message}`);
      setApiLoading(false);
    }
  };

  const getTopTracks = useCallback(async () => {
    setApiLoading(true);
    try {
      const { data: response } = await axios.get(
        `${fiyosaavnApiBaseUri}/playlists?id=1134543272&limit=50`,
      );
      setTopTracks(response.data.songs);
      setTracks(response.data.songs);
      setApiLoading(false);
      return response.data.songs;
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      setApiLoading(false);
    }
  }, [fiyosaavnApiBaseUri]);

  const downloadTrack = async (trackId) => {
    try {
      const response = await axios.get(modalDownloadData.fileUrl, {
        responseType: "blob",
      });
      const audioBlob = response.data;

      const finalBlob = new Blob([audioBlob], { type: "audio/mpeg" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(finalBlob);
      link.download = modalDownloadData.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading track: ${error.message}`);
    }
  };

  const playTrack = async (trackId) => {
    if (isAudioPlaying) return;
    setIsAudioLoading(true);
    try {
      await getTrack(trackId);
      setIsAudioPlaying(true);
    } catch (error) {
      console.error("Error playing track:", error);
      setIsAudioPlaying(false);
    } finally {
      setIsAudioLoading(false);
    }
  };

  useEffect(() => {
    const fetchTrackData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const trackParam = queryParams.get("track");
      const playParam = queryParams.get("play");

      if (trackParam) {
        try {
          const trackData = await getTrackData(trackParam);

          if (trackData) {
            const { link, ...rest } = trackData;
            setCurrentTrack(rest);
            setIsTrackDeckModalOpen(true);
            if (playParam === "true") {
              setIsTrackDeckModalOpen(true);
            }
          }
        } catch (error) {
          console.error("Error fetching track data:", error);
        }
      }
    };

    fetchTrackData();
  }, [location.search, setCurrentTrack]);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const queryParam = queryParams.get("q");
      const trackParam = queryParams.get("track");
      const playParam = queryParams.get("play");
      const loopParam = queryParams.get("loop");

      try {
        if (trackParam && playParam === "true") {
          await playTrack(trackParam);
        }

        if (loopParam === "true") {
          setLoopAudio(true);
        }

        if (queryParam) {
          const tracksResult = await searchTracks(queryParam);
          setSearchText(queryParam);

          if (playParam === "true" && !trackParam && tracksResult.length > 0) {
            const firstTrack = tracksResult[0].id;
            if (currentTrack.id !== firstTrack) {
              await playTrack(firstTrack);
            }
          }
        } else {
          const topTracksResult = await getTopTracks();

          if (
            playParam === "true" &&
            !trackParam &&
            topTracksResult.length > 0
          ) {
            const randomTrack =
              topTracksResult[
                Math.floor(Math.random() * topTracksResult.length)
              ].id;
            if (currentTrack.id !== randomTrack) {
              await playTrack(randomTrack);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value) {
      searchTracks(value);
    } else {
      getTopTracks();
    }
  };

  const openDownloadModal = async (trackId) => {
    try {
      setIsDownloadLoading(true);
      let trackData;
      if (currentTrack.id !== trackId) {
        trackData = await getTrackData(trackId);
      } else {
        trackData = currentTrack;
      }
      setModalDownloadData({
        fileUrl: trackData.link,
        fileName: `${trackData.name} - ${trackData.artists
          .split(",")[0]
          .trim()}.mp3`,
        fileImage: trackData.image,
      });
      setIsDownloadModalOpen(true);
      setApiError(false);
    } catch (error) {
      setApiError(true);
      setPrintError(`${error.code} : ${error.message}`);
    } finally {
      setIsDownloadLoading(false);
    }
  };

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  const openSpeechModal = () => {
    setIsSpeechModalOpen(true);
    startSpeechRecognition();
    handleAudioPause();
  };

  const closeSpeechModal = useCallback(() => {
    setIsSpeechModalOpen(false);
    stopSpeechRecognition();
  }, []);

  const startSpeechRecognition = () => {
    WebSpeechRecognition.startListening();
    setTimeout(() => {
      closeSpeechModal();
    }, 10000);
  };

  const stopSpeechRecognition = () => {
    WebSpeechRecognition.stopListening();
  };

  // Native Speech Recognition

  // Web Speech Recognition
  const { listening: speechListening, transcript: speechTranscript } =
    useSpeechRecognition({
      commands: [
        {
          command: "play",
          callback: () => {
            closeSpeechModal();
          },
        },
        {
          command: "play *",
          callback: (speechSearchTerm) => playOnSpeechCommand(speechSearchTerm),
        },
      ],
    });

  const speechModalWaves = document.querySelectorAll(
    ".speechWaveBox1, .speechWaveBox2, .speechWaveBox3, .speechWaveBox4, .speechWaveBox5",
  );
  if (speechListening) {
    speechModalWaves.forEach((element) => {
      element.style.animationPlayState = "running";
    });
  } else {
    speechModalWaves.forEach((element) => {
      element.style.animationPlayState = "paused";
    });
  }

  useEffect(() => {
    if (
      !speechListening &&
      speechTranscript &&
      !speechTranscript.toLowerCase().startsWith("play")
    ) {
      searchTracks(speechTranscript);
      setSearchText(speechTranscript);
      const searchTts = new Audio(
        `https://www.google.com/speech-api/v1/synthesize?text=${encodeURIComponent(
          speechTranscript,
        )}&enc=mpeg&lang=hi-in&speed=.5&client=lr-language-tts&use_google_only_voices=1`,
      );
      searchTts.play();
      closeSpeechModal();
    }
  }, [speechListening, speechTranscript, closeSpeechModal, searchTracks]);

  const playOnSpeechCommand = (speechSearchTerm) => {
    if (speechSearchTerm) {
      searchSpeechTracks(speechSearchTerm);
      setSearchText(speechSearchTerm);
      closeSpeechModal();
      setTimeout(() => {
        stopSpeechRecognition();
      }, 1000);
    }
  };

  const customModalStyles = {
    content: {
      top: "45%",
      left: "50%",
      maxWidth: "600px",
      width: "90%",
      transform: "translate(-50%, -50%)",
      border: "0",
      borderRadius: "1rem",
      height: "20rem",
      fontFamily: "SpotifyMedium",
      color: "var(--fm-primary-link)",
      backgroundColor: "var(--fm-secondary-bg-color)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: "1",
    },
  };

  const trackDeckModalStyles = {
    content: {
      inset: "0",
      padding: "0",
      zIndex: "1",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: "1",
    },
  };

  const renderTracks = () => {
    return tracks.map((track, index) => (
      <TrackItem
        key={index}
        index={index}
        track={track}
        onGetTrack={getTrack}
        onOpenDownloadModal={(trackId) => openDownloadModal(trackId)}
        isDownloadLoading={isDownloadLoading}
      />
    ));
  };

  return (
    <section id="music">
      <div className="music-container">
        {isMobile ? (
          <Headroom>
            <CustomTopNavbar
              navbarPrevPage="/"
              navbarCover={spotifyLogo}
              navbarTitle="Music"
              navbarFirstIcon="fa fa-list-music"
              navbarSecondIcon="fa fa-gear"
              setBorder
            />
          </Headroom>
        ) : null}
        <div className="search-container">
          <div className="search-box">
            <div
              className="search-bar"
              style={{
                border: `${
                  searchFieldActive
                    ? ".1rem solid var(--fm-primary-text"
                    : ".1rem solid var(--fm-secondary-bg-color)"
                }`,
              }}
            >
              <i
                className="far fa-search search-magnify-icon"
                style={{
                  color: `${
                    searchFieldActive
                      ? "var(--fm-primary-text)"
                      : "var(--fm-primary-text-muted)"
                  }`,
                }}
              ></i>
              <input
                type="text"
                className="search-input-field"
                placeholder="Search Tracks..."
                onChange={handleSearchChange}
                value={searchText}
                onFocus={() => setSearchFieldActive(true)}
                onBlur={() => setSearchFieldActive(false)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                right: "0",
                borderRadius: "0",
                height: "2.7rem",
              }}
            >
              <i
                className="fm-primary-btn fa fa-microphone"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1.1rem",
                  height: "100%",
                }}
                onClick={openSpeechModal}
              ></i>
              <button
                className="fm-primary-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1rem",
                  height: "100%",
                  borderLeft: ".1rem solid var(--fm-secondary-bg-color)",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  setSearchText("");
                }}
              >
                <i
                  className={`${
                    apiLoading ? "fa fa-spinner fa-spin" : "fa fa-x"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`print-error alert alert-danger ${
            apiError ? "" : "hidden"
          }`}
        >
          {printError}
        </div>
        <button
          className="fm-primary-btn"
          style={{ padding: ".5rem", marginLeft: "1rem" }}
          onClick={deleteCachedAudioData}
        >
          Clear Cached Data
        </button>
        <div className="render-tracks">{renderTracks()}</div>
        <Modal
          isOpen={isDownlodModalOpen}
          onRequestClose={closeDownloadModal}
          contentLabel="Download Modal"
          style={customModalStyles}
        >
          <h4>Do you want to download?</h4>
          <div className="flex my-4 items-center bg-gray-800 p-2 rounded">
            <img
              src={modalDownloadData.fileImage}
              className="w-15 h-15 rounded"
              alt="File Image"
            />
            <p className="text-[--fm-primary-text] mx-2">
              {modalDownloadData.fileName}
            </p>
          </div>
          <p className="mb-3">Download in progress: {downloadProgress}%</p>
          <progress value={downloadProgress} max="100"></progress>
          <button
            className="fm-primary-btn-inverse mt-3"
            onClick={closeDownloadModal}
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
              padding: "1rem",
              width: "8rem",
              borderRadius: ".5rem",
            }}
          >
            Cancel
          </button>
          <button
            className="fm-primary-btn"
            onClick={() => downloadTrack(modalDownloadData.trackId)}
            style={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
              padding: "1rem",
              width: "8rem",
              borderRadius: ".5rem",
            }}
          >
            Download
          </button>
        </Modal>
        <Modal
          isOpen={isSpeechModalOpen}
          onRequestClose={closeSpeechModal}
          contentLabel="Speech Recognition Modal"
          style={customModalStyles}
        >
          <div className="speechWave">
            <div
              className="speechWaveBoxContainer"
              style={{
                outline:
                  !speechTranscript && !speechListening
                    ? ".5rem solid red"
                    : "0",
              }}
              onClick={startSpeechRecognition}
            >
              <div className="speechWaveBox speechWaveBox1"></div>
              <div className="speechWaveBox speechWaveBox2"></div>
              <div className="speechWaveBox speechWaveBox3"></div>
              <div className="speechWaveBox speechWaveBox4"></div>
              <div className="speechWaveBox speechWaveBox5"></div>
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "var(--fm-primary-text)",
              textAlign: "center",
              fontFamily: "SpotifyMedium",
              fontSize: "1.3rem",
            }}
          >
            {!speechTranscript && !speechListening
              ? "Didn't Catch, Speak again"
              : !speechTranscript
              ? `Play "${topTracks[0] && topTracks[0].name}"`
              : speechTranscript}
            <br />
            <br />
            {!speechTranscript && !speechListening ? (
              <button
                className="fm-primary-btn-outline"
                style={{
                  padding: ".5rem",
                  width: "8rem",
                  borderRadius: ".5rem",
                  fontSize: ".9rem",
                }}
                onClick={startSpeechRecognition}
              >
                Try Again
              </button>
            ) : null}
          </div>
        </Modal>
      </div>
      {!isMobile ? (
        currentTrack.id ? (
          <TrackDeck />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
              width: "100%",
            }}
          >
            <svg
              className="music-icon"
              title="Play Music"
              width="35px"
              height="35px"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "7rem",
                height: "7rem",
                padding: "1.5rem",
                border: ".2rem solid var(--fm-primary-text)",
                borderRadius: "50%",
              }}
            >
              <path
                d="M29 6V35"
                fill="#fff"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 36.04C15 33.2565 17.2565 31 20.04 31H29V36.96C29 39.7435 26.7435 42 23.96 42H20.04C17.2565 42 15 39.7435 15 36.96V36.04Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                fill="none"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29 14.0664L41.8834 17.1215V9.01339L29 6V14.0664Z"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 8H20"
                fill="#fff"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 16H20"
                fill="#fff"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 24H16"
                fill="#fff"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <br />
            <p className="text-[--fm-primary-text-muted] mb-3">
              Play a track to feel the vibe.
            </p>
            <button
              className="p-2 text-xs border-none rounded bg-blue-600"
              onClick={() => getTrack(tracks[0].id)}
            >
              Play the first track
            </button>
          </div>
        )
      ) : (
        <Modal
          className="track-deck--modal"
          style={trackDeckModalStyles}
          isOpen={isTrackDeckModalOpen}
          onRequestClose={() => setIsTrackDeckModalOpen(false)}
        >
          <div className="track-deck--modal-header">
            <i
              className="fal fa-times"
              onClick={() => setIsTrackDeckModalOpen(false)}
            />
            <i
              className="fal fa-share-alt"
              onClick={(event) => setIsShareMenuOpen(event.currentTarget)}
            />
            <Menu
              className="track-deck--modal-menu"
              anchorEl={isShareMenuOpen}
              open={isShareMenuOpen}
              onClose={() => setIsShareMenuOpen(false)}
            >
              <MenuItem
                onClick={() => {
                  setIsShareMenuOpen(false);
                  navigator.clipboard.writeText(
                    `https://flexiyo.web.app/music?track=${currentTrack.id}`,
                  );
                }}
              >
                Copy Link
              </MenuItem>
            </Menu>
          </div>
          <TrackDeck />
        </Modal>
      )}
    </section>
  );
};

export default Music;
