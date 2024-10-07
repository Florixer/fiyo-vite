import React from "react";
import Sheet from "react-modal-sheet";
import Comment from "./Comment";

function CommentsSheet({
  comments,
  isCommentsSheetOpen,
  setIsCommentsSheetOpen,
}) {
  const renderClipComments = () => {
    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  };

  return (
    <Sheet
      className="clip-comments--sheet"
      detent="content-height"
      isOpen={isCommentsSheetOpen}
      onClose={() => setIsCommentsSheetOpen(false)}
      snapPoints={[1, 0.7]}
      initialSnap={1}
    >
      <Sheet.Container className="clip-comments--sheet-container">
        <Sheet.Header />
        <p className="text-xs text-center border-b border-gray-600 pb-3">
          Comments
        </p>
        <Sheet.Content className="clip-comments--sheet-content">
          {renderClipComments()}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onClick={() => setIsCommentsSheetOpen(false)} />
    </Sheet>
  );
}

export default CommentsSheet;
