import React, { useState, useEffect, useCallback, useRef } from "react";
import Sheet from "react-modal-sheet";

const ClipItem = ({ clip, index, isMuted, toggleClipMuted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const clipRef = useRef(null);
  const progressBarRef = useRef(null);
  const [pressTimer, setPressTimer] = useState(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const [isMuteChange, setIsMuteChange] = useState(true);
  const [isClipCommentsSheetOpen, setIsClipCommentsSheetOpen] = useState(false);

  const handleLongPress = () => {
    const clip = clipRef.current;
    clip.pause();
    setIsPlaying(false);
    setIsLongPress(true);
  };

  const startPressTimer = (event) => {
    if (
      !event.target.closest(
        ".clip-details--creator, .clip-details--metadata, .clip-engagement, .clip-controls--progressbar",
      )
    ) {
      const timer = setTimeout(handleLongPress, 300);
      setPressTimer(timer);
    }
  };

  const clearPressTimer = () => {
    const clip = clipRef.current;
    clip.play();
    setIsPlaying(true);
    setIsLongPress(false);
    clearTimeout(pressTimer);
  };

  useEffect(() => {
    const clip = clipRef.current;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          entry.target.currentTime = 0;
          entry.target.play();
        } else {
          setIsPlaying(false);
          entry.target.pause();
        }
      });
    }, options);

    observer.observe(clip);

    return () => {
      observer.unobserve(clip);
    };
  }, []);

  const handleClipClick = (event) => {
    if (
      !event.target.closest(
        ".clip-details-creator, .clip-details-metadata, .clip-engagement, .clip-controls--progressbar",
      )
    ) {
      toggleClipMuted();
      setIsMuteChange(true);
      setTimeout(() => {
        setIsMuteChange(false);
      }, 1500);
    }
  };

  const handleClipDoubleClick = () => {};

  useEffect(() => {
    setTimeout(() => {
      setIsMuteChange(false);
    }, 1000);
  }, []);

  const handleProgressBarClick = (e) => {
    const clip = clipRef.current;
    const progressBar = progressBarRef.current;
    const newPosition = (e.nativeEvent.offsetX / progressBar.clientWidth) * 100;
    setProgress(newPosition);
    clip.currentTime = (newPosition / 100) * clip.duration;
  };

  const handleProgressBarMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressBarDrag = (e) => {
    if (isDragging) {
      const clip = clipRef.current;
      const progressBar = progressBarRef.current;
      const newPosition =
        (e.nativeEvent.offsetX / progressBar.clientWidth) * 100;
      setProgress(newPosition);
      clip.currentTime = (newPosition / 100) * clip.duration;
    }
  };

  const handleProgressBarTouchStart = (e) => {
    setIsDragging(true);
    setTouchStartPosition(e.touches[0].clientX);
  };

  const handleProgressBarTouchMove = useCallback(
    (e) => {
      if (isDragging) {
        const clip = clipRef.current;
        const progressBar = progressBarRef.current;
        const touchPosition = e.touches[0].clientX;
        const deltaX = touchPosition - touchStartPosition;
        const newPosition =
          (((progress + (deltaX / progressBar.clientWidth) * 100) % 100) +
            100) %
          100;

        setProgress(newPosition);
        clip.pause();
        clip.currentTime = (newPosition / 100) * clip.duration;
        setTouchStartPosition(touchPosition);
      }
    },
    [isDragging, progress, touchStartPosition],
  );

  const handleProgressBarTouchEnd = useCallback(() => {
    if (isDragging) {
      const clip = clipRef.current;
      setIsDragging(false);
      if (isPlaying) {
        clip.play();
      }
    }
  }, [isDragging, isPlaying]);

  useEffect(() => {
    const handleGlobalTouchMove = (e) => {
      handleProgressBarTouchMove(e);
    };
    const handleGlobalTouchEnd = () => {
      handleProgressBarTouchEnd();
    };

    document.addEventListener("touchmove", handleGlobalTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", handleGlobalTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [handleProgressBarTouchMove, handleProgressBarTouchEnd]);

  useEffect(() => {
    const clip = clipRef.current; // Copy ref value to a variable

    const updateProgress = () => {
      if (clip) {
        const currentTime = clip.currentTime;
        const duration = clip.duration;
        setProgress((currentTime / duration) * 100);
      }
    };

    if (clip) {
      clip.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (clip) {
        clip.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [clipRef]);

  const openClipCommentsSheet = () => {
    setIsClipCommentsSheetOpen(true);
  };

  const closeClipCommentsSheet = () => {
    setIsClipCommentsSheetOpen(false);
  };

  return (
    <div
      key={clip.id}
      index={index}
      className="clip-container"
      style={{ position: "relative" }}
      onClick={handleClipClick}
      onDoubleClick={handleClipDoubleClick}
      onTouchStart={startPressTimer}
      onTouchEnd={clearPressTimer}
      onTouchCancel={clearPressTimer}
    >
      <video
        ref={clipRef}
        className="clip-video"
        style={{
          height: "calc(100vh - var(--fm-mobile-bottom-navbar-height))",
        }}
        preload="auto"
        muted={isMuted}
        loop
        poster={clip.thumb}
      >
        <source src={clip.src} type="video/mp4" />
      </video>
      <div
        className="clip-overlay"
        style={{
          transition: "opacity .3s",
          opacity: isLongPress ? 0 : 1,
        }}
      >
        <div className="clip-details">
          <div className="clip-details--creator">
            <span className="clip-details--creator-pfp">
              <img src={clip.creators.items[0].pfp} alt="creator-pfp" />
            </span>
            <span
              className="clip-details--creator-username"
              key={clip.creators.items[0].id}
            >
              {clip.creators.items[0].username}
            </span>
          </div>
          <div className="clip-details--metadata">
            <span className="clip-details--metadata-caption">
              {clip.metadata.caption}
            </span>
            {/* <span className="clip-details--metadata-description">
              {clip.metadata.description}
            </span> */}
            <span className="clip-details--metadata-audio">
              <i className="fa fa-music"></i>
              {clip.metadata.audio.original
                ? `${clip.creators.items[0].username} • Original Audio`
                : `${clip.metadata.audio.external.name} •
          ${clip.metadata.audio.external.provider.username}`}
            </span>
          </div>
        </div>
        <div className="clip-engagement">
          <span className="clip-engagement--likes">
            <i className="fal fa-heart"></i>
            <label>{clip.engagement.likesCount}</label>
          </span>
          <span
            className="clip-engagement--comments"
            onClick={openClipCommentsSheet}
          >
            <i className="fal fa-comment"></i>
            <label>{clip.engagement.commentsCount}</label>
          </span>
          <span className="clip-engagement--forwards">
            <i className="fal fa-paper-plane"></i>
            <label>{clip.engagement.forwardsCount}</label>
          </span>
          <span className="clip-engagement--ellipsis">
            <i className="fal fa-ellipsis-v"></i>
          </span>
          <span className="clip-engagement--audio-cover">
            <img
              src={
                clip.metadata.audio.original
                  ? clip.creators.items[0].pfp
                  : clip.metadata.audio.external.cover
              }
              alt="audio-cover"
            />
          </span>
        </div>
        <div className="clip-controls">
          <div
            className="clip-controls--mute"
            style={{
              transition: "opacity .3s, transform .3s",
              opacity: isMuteChange ? 1 : 0,
              transform: isMuteChange ? "scale(1.07)" : "scale(1)",
            }}
          >
            {isMuted ? (
              <svg
                fill="#fff"
                role="img"
                viewBox="0 0 48
          48"
              >
                <path
                  d="M1.5 13.3c-.8 0-1.5.7-1.5
            1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3
            2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8
            31.4-5.5-5.5C44.9 36.6 48 31.4 48
            24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0
            2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4
            2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6
            0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5
            22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2
            1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1
            0l1.4-1.4c.7-.6.7-1.6.1-2.2z"
                ></path>
              </svg>
            ) : (
              <svg role="img" fill="#fff" viewBox="0 0 24 24">
                <title>Audio is playing</title>
                <path
                  d="M16.636 7.028a1.5
          1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0
          1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981
          8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59
          8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0
          0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0
          0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1
          0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0
          1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"
                ></path>
              </svg>
            )}
          </div>
          <div
            ref={progressBarRef}
            className="clip-controls--progressbar"
            onClick={handleProgressBarClick}
            onMouseDown={handleProgressBarMouseDown}
            onMouseMove={handleProgressBarDrag}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={handleProgressBarTouchStart}
            onTouchMove={handleProgressBarTouchMove}
            onTouchEnd={handleProgressBarTouchEnd}
          >
            <div
              className="clip-controls--progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <ClipCommentsSheet
            clipId={clip.id}
            isClipCommentsSheetOpen={isClipCommentsSheetOpen}
            setIsClipCommentsSheetOpen={setIsClipCommentsSheetOpen}
          />
        </div>
      </div>
    </div>
  );
};

const ClipCommentsSheet = ({
  clipId,
  isClipCommentsSheetOpen,
  setIsClipCommentsSheetOpen,
}) => {
  const clipComments = {
    id: clipId,
    items: [
      {
        uid: "123456789",
        cover: "https://via.placeholder.com/100x100",
        title: "_.user.me23",
        content: {
          type: "text",
          value: "Bro wants to manipulate us!",
        },
        replies: {
          totalCount: 2,
          items: [
            {
              uid: "638560123",
              cover: "https://via.placeholder.com/100x100",
              title: "_.user.me23",
              content: {
                type: "text",
                value: "Nah I don't think 🤔",
              },
            },
            {
              uid: "457230985",
              cover: "https://via.placeholder.com/100x100",
              title: "aesth_.etic",
              content: {
                type: "image",
                value: {
                  src: "https://gif.com",
                },
              },
            },
          ],
        },
      },
      {
        uid: "272798002",
        cover: "https://via.placeholder.com/200x200",
        title: "its_you.only",
        content: {
          type: "text",
          value: "Not only me but everyone agreed!",
        },
        replies: {
          totalCount: 1,
          items: [
            {
              uid: "375982128",
              cover: "https://via.placeholder.com/300x300",
              title: "that.lonegirl",
              content: {
                type: "text",
                value: "Riyal 👍",
              },
            },
          ],
        },
      },
    ],
  };

  const renderClipComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.uid} className="clip-comment">
        <div className="clip-comment--content">
          <img
            src={comment.cover}
            alt={`${comment.title}'s avatar`}
            className="clip-comment--content-cover"
          />
          <h3 className="clip-comment--content-title">{comment.title}</h3>
          {comment.content.type === "text" ? (
            <p className="clip-comment--content-text">
              {comment.content.value}
            </p>
          ) : (
            <img
              src={comment.content.value.src}
              alt="clip comment"
              className="clip-comment--content-image"
            />
          )}
        </div>
        {comment.replies && comment.replies.totalCount > 0 && (
          <>
            <div className="clip-comment--view-replies">
              View
              {comment.replies.totalCount} replies
            </div>
            <div className="clip-comment--replies">
              {renderClipComments(comment.replies.items)}
            </div>
          </>
        )}
      </div>
    ));
  };

  return (
    <Sheet
      className="clip-comments--sheet"
      detent="content-height"
      isOpen={isClipCommentsSheetOpen}
      onClose={() => setIsClipCommentsSheetOpen(false)}
    >
      <Sheet.Container className="clip-comments--sheet-container">
        <Sheet.Header />
        <Sheet.Content>{renderClipComments(clipComments.items)}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default ClipItem;
