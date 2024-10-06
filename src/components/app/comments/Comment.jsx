import React, { useRef, useState } from "react";

function Comment({ comment }) {
  const repliesRef = useRef(null);
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);

  const toggleReplies = () => {
    setAreRepliesVisible(!areRepliesVisible);
  };

  const renderReplies = () => {
    return (
      <div className={`${areRepliesVisible ? "" : "hidden"}`}>
        {comment.replies.map((reply) => (
          <div key={reply.id} className="flex flex-wrap flex-row my-3">
            <div>
              <img
                src={reply.user_avatar}
                className="rounded-full w-9 ml-9 mr-3"
                alt="User avatar"
              />
            </div>
            <div className="flex flex-col max-w-64">
              <p className="text-[.7rem]">{reply.username}</p>
              <p className="text-xs mt-1 break-words">{reply.content}</p>
              <p className="text-[.7rem] my-2 text-gray-400 cursor-pointer">
                Reply
              </p>
            </div>
          </div>  
        ))}
      </div>
    );
  };

  return (
    <div key={comment.id} className="flex flex-wrap flex-row mt-3">
      <div>
        <img
          src={comment.user_avatar}
          className="rounded-full w-10 ml-5 mr-3"
          alt="User avatar"
        />
      </div>
      <div className="comment-text">
        <p className="text-[.7rem]">{comment.username}</p>
        <p className="text-xs mt-1">{comment.content}</p>
        <p className="text-[.7rem] my-2 text-gray-400 cursor-pointer">Reply</p>
        {comment.replies.length > 0 && !areRepliesVisible && (
          <p
            className="text-[.7rem] my-2 ml-9 text-gray-400 cursor-pointer"
            onClick={toggleReplies}
          >
            View {comment.replies.length} Replies
          </p>
        )}

        {renderReplies()}
        {areRepliesVisible && (
          <p
            className="text-[.7rem] my-2 ml-9 text-gray-400 cursor-pointer"
            onClick={toggleReplies}
          >
            Hide Replies
          </p>
        )}
      </div>
    </div>
  );
}

export default Comment;
