import React, { useState, useEffect, useCallback, useRef, useId } from "react";
import CommentsSheet from "../app/comments/CommentsSheet";

const ClipItem = ({ clip, isClipMuted, setIsClipMuted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMuteChange, setIsMuteChange] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showAnimatedHeart, setShowAnimatedHeart] = useState(false);
  const [isCommentsSheetOpen, setIsCommentsSheetOpen] = useState(false);

  const clipRef = useRef(null);
  const progressBarRef = useRef(null);
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef(0);

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

  useEffect(() => {
    setTimeout(() => {
      setIsMuteChange(false);
    }, 1000);
  }, []);

  const handleClipClick = (event) => {
    const excludedClasses = [
      ".clip-details-creator",
      ".clip-details-metadata",
      ".clip-engagement",
      ".clip-controls--progressbar",
    ];
  
    // If the target is inside one of the excluded elements, return early
    if (excludedClasses.some((cls) => event.target.closest(cls))) {
      return;
    }
  
    // Increment click count
    clickCountRef.current += 1;
  
    // Clear any existing timeout to reset the delay between clicks
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
  
    // Set timeout to check for single vs double click
    clickTimeoutRef.current = setTimeout(() => {
      if (clickCountRef.current === 2) {
        // Double-click logic: like the clip and show animated heart
        setIsLiked(true);
        setShowAnimatedHeart(true);
        setTimeout(() => {
          setShowAnimatedHeart(false);
        }, 500); // Reduced animation time for smoother UX
      } else if (clickCountRef.current === 1) {
        // Single-click logic: mute/unmute if comments sheet isn't open
        if (!isCommentsSheetOpen) {
          setIsClipMuted((prev) => {
            const newMuteState = !prev;
            setIsMuteChange(true);
            setTimeout(() => {
              setIsMuteChange(false);
            }, 500); // Reduced mute change time for faster feedback
            return newMuteState;
          });
        }
      }
  
      // Reset click count
      clickCountRef.current = 0;
    }, 180); // Reduced timeout for faster detection
  };
  

  const handleProgressBarClick = (e) => {
    const clip = clipRef.current;
    const progressBar = progressBarRef.current;
    const newPosition = (e.nativeEvent.offsetX / progressBar.clientWidth) * 100;
    setProgress(newPosition);
    clip.currentTime = (newPosition / 100) * clip.duration;
  };

  const handleProgressBarTouchMove = (e) => {
    if (isDragging) {
      const clip = clipRef.current;
      const progressBar = progressBarRef.current;
      const touchPosition = e.touches[0].clientX;
      const deltaX = touchPosition - e.touches[0].clientX;
      const newPosition =
        (((progress + (deltaX / progressBar.clientWidth) * 100) % 100) + 100) %
        100;

      setProgress(newPosition);
      clip.pause();
      clip.currentTime = (newPosition / 100) * clip.duration;
    }
  };

  useEffect(() => {
    const clip = clipRef.current;

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
  }, []);

  const comments = [
    {
      id: 1,
      username: "user.123",
      user_avatar: " https://picsum.photos/50",
      content: "Hey bro, How do you do that?",
      replies: [
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content:
            "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet. ",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.123",
          user_avatar: " https://picsum.photos/30",
          content: "Lorem ipsum dolor sit amet.",
        },
      ],
      likesCount: 3,
    },
    {
      id: 2,
      username: "user.456",
      user_avatar: " https://picsum.photos/100",
      content: "Please give me some answers on it.",
      replies: [
        {
          id: useId(10),
          username: "user.abc",
          user_avatar: " https://picsum.photos/100",
          content: "@user.456 Sure let's see.",
        },
        {
          id: useId(10),
          username: "user.def",
          user_avatar: " https://picsum.photos/100",
          content:
            "@user.456 Here you go, Stop If you are not interested in it. Lorem ipsum dolor sit amet.",
        },
        {
          id: useId(10),
          username: "user.ghi",
          user_avatar: " https://picsum.photos/100",
          content: "@user.456 Good Question 😀",
        },
      ],
      likesCount: 43,
    },
  ];

  const openCommentsSheet = () => {
    setIsCommentsSheetOpen(true);
  };

  return (
    <div
      key={clip.id}
      className="clip-container"
      style={{ position: "relative" }}
      onClick={handleClipClick}
    >
      <video
        ref={clipRef}
        className="clip-video"
        style={{
          height: "calc(100vh - var(--fm-mobile-bottom-navbar-height))",
        }}
        preload="auto"
        muted={isClipMuted}
        loop
        poster={clip.thumb}
      >
        <source src={clip.src} type="video/mp4" />
      </video>
      <div
        className="clip-overlay"
        style={{
          transition: "opacity .3s",
          opacity: 1,
        }}
      >
        <div className="clip-details">
          <div className="clip-details--creator">
            <span className="clip-details--creator-pfp">
              <img src={clip.creators[0].pfp} alt="creator-pfp" />
            </span>
            <span
              className="clip-details--creator-username"
              key={clip.creators[0].id}
            >
              {clip.creators[0].username}
            </span>
          </div>
          <div className="clip-details--metadata">
            <span className="clip-details--metadata-caption">
              {clip.metadata.caption}
            </span>
            <span className="clip-details--metadata-audio">
              <i className="fa fa-music"></i>
              {clip.metadata.audio.original
                ? `${clip.creators[0].username} • Original Audio`
                : `${clip.metadata.audio.external.name} • ${clip.metadata.audio.external.provider.username}`}
            </span>
          </div>
        </div>
        <div className="clip-engagement">
          <span
            className="clip-engagement--likes"
            onClick={() => setIsLiked((prev) => !prev)}
          >
            {!isLiked ? (
              <svg
                aria-label="Like"
                fill="#ffffff"
                height="30"
                role="img"
                viewBox="0 0 24 24"
                width="30"
              >
                <title>Like</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
            ) : (
              <svg
                aria-label="Unlike"
                fill="red"
                height="30"
                role="img"
                viewBox="0 0 48 48"
                width="30"
              >
                <title>Unlike</title>
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            )}
            <label>
              {isLiked
                ? clip.engagement.likesCount + 1
                : clip.engagement.likesCount}
            </label>
          </span>
          <span
            className="clip-engagement--comments"
            onClick={openCommentsSheet}
          >
            <svg
              aria-label="Comment"
              fill="#ffffff"
              height="30"
              role="img"
              viewBox="0 0 24 24"
              width="30"
            >
              <title>Comment</title>
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <label>{clip.engagement.commentsCount}</label>
          </span>
          <span className="clip-engagement--forwards">
            <svg
              aria-label="Share"
              fill="#ffffff"
              height="30"
              role="img"
              viewBox="0 0 24 24"
              width="30"
            >
              <title>Share</title>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
              ></line>
              <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
            <label>{clip.engagement.forwardsCount}</label>
          </span>
          <span className="clip-engagement--ellipsis">
            <i className="fal fa-ellipsis-v"></i>
          </span>
          <span className="clip-engagement--audio-cover">
            <img
              src={
                clip.metadata.audio.original
                  ? clip.creators[0].pfp
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
            {isClipMuted ? (
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
          <div className={`absolute ${showAnimatedHeart ? "" : "hidden"}`}>
            {showAnimatedHeart && (
              <svg
                aria-label="Like Animation"
                className="like-animation"
                fill="red"
                height="120"
                role="img"
                viewBox="0 0 48 48"
                width="120"
              >
                <title>Like Animation</title>
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            )}
          </div>
        </div>
        <div
          className="clip-controls--progressbar"
          ref={progressBarRef}
          style={{
            background: `linear-gradient(to right, #ffffff ${progress}%, rgba(255, 255, 255, 0.3) ${progress}%)`,
          }}
          onClick={handleProgressBarClick}
          onTouchMove={handleProgressBarTouchMove}
        ></div>
      </div>
      {isCommentsSheetOpen && (
        <CommentsSheet
          clipId={clip.id}
          comments={comments}
          isCommentsSheetOpen={isCommentsSheetOpen}
          setIsCommentsSheetOpen={setIsCommentsSheetOpen}
        />
      )}
    </div>
  );
};

export default ClipItem;
