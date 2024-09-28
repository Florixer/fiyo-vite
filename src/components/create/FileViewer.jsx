import { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FileViewer = ({ fileType, filePath, fileThumbnail }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    setIsVideoPlaying((prevState) => !prevState);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isVideoPlaying) {
        video.play();
        setIsVideoPlaying(true);
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    }
  }, [isVideoPlaying]);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      video.pause();
      setIsVideoPlaying(false);
    };

    if (video) {
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {fileType === "image" ? (
        <LazyLoadImage
          src={filePath}
          alt="file-content"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : fileType === "video" ? (
        <>
          <video
            ref={videoRef}
            src={filePath}
            poster={fileThumbnail}
            style={{ width: "100%", height: "100%" }}
            onClick={handleVideoClick}
          ></video>
          {!isVideoPlaying ? (
            <div
              style={{
                position: "absolute",
                backgroundColor: "var(--fm-transparent-bg-color)",
                borderRadius: "50%",
                padding: "1.5rem",
                cursor: "pointer",
              }}
              onClick={handleVideoClick}
            >
              <svg
                fill="#fff"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                viewBox="0 0 163.861 163.861"
              >
                <g>
                  <path
                    d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
		c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"
                  />
                </g>
              </svg>
            </div>
          ) : null}
        </>
      ) : fileType === "audio" ? (
        <audio src={filePath} style={{ width: "100%" }} controls></audio>
      ) : (
        <div>File type not supported!</div>
      )}
    </div>
  );
};

export default FileViewer;
