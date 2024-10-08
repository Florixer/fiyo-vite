import React, { useState } from "react";

function Comment({ comment }) {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [visibleRepliesCount, setVisibleRepliesCount] = useState(5);
  const [isCommentLiked, setIsCommentLiked] = useState(false);

  const toggleReplies = () => {
    if (!areRepliesVisible) {
      setAreRepliesVisible(true);
      setVisibleRepliesCount(5);
    } else if (visibleRepliesCount < comment.replies.length) {
      setVisibleRepliesCount((prevCount) =>
        Math.min(prevCount + 5, comment.replies.length),
      );
    } else {
      setAreRepliesVisible(false);
    }
  };

  const renderReplies = () => {
    const displayedReplies = comment.replies.slice(0, visibleRepliesCount);

    return (
      <div className={`${areRepliesVisible ? "" : "hidden"} mr-3 mt-3`}>
        {displayedReplies.map((reply) => (
          <div key={reply.id} className="flex flex-row mb-3">
            <div>
              <img
                src={reply.user_avatar}
                className="rounded-full w-9 mr-3"
                alt="User avatar"
              />
            </div>
            <div className="flex flex-col w-full max-w-full">
              <p className="text-[.7rem]">{reply.username}</p>
              <p className="text-xs mt-1 break-words">{reply.content}</p>
              <p className="text-[.7rem] mt-2 text-gray-400 cursor-pointer">
                Reply
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div key={comment.id} className="flex flex-row mt-3 ml-5">
      <div>
        <img
          src={comment.user_avatar}
          className="rounded-full w-10 mr-3"
          alt="User avatar"
        />
      </div>
      <div
        className="absolute end-0 flex justify-center items-center w-16 h-16"
        onClick={() => setIsCommentLiked(!isCommentLiked)}
      >
        <i
          className={`${
            isCommentLiked ? "fas fa-heart text-red-600" : "fal fa-heart"
          } text-xl cursor-pointer`}
        ></i>
      </div>
      <div className="flex flex-col w-full max-w-full">
        <p className="text-[.7rem]">{comment.username}</p>
        <p className="text-xs mt-1 break-words">{comment.content}</p>
        <p className="text-[.7rem] my-2 text-gray-400 cursor-pointer">Reply</p>

        {renderReplies()}
        {comment.replies.length > 0 && (
          <p
            className="text-[.7rem] ml-11 text-gray-400 cursor-pointer"
            onClick={toggleReplies}
          >
            {!areRepliesVisible
              ? `View ${comment.replies.length} Replies`
              : visibleRepliesCount < comment.replies.length
              ? `View ${
                  comment.replies.length - visibleRepliesCount
                } more replies`
              : "Hide Replies"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Comment;
