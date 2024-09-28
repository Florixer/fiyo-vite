import { useState, useContext } from "react";
import FileViewer from "./FileViewer";
import CreateContext from "@/context/create/CreateContext";

const ContentViewport = () => {
  const { selectedFileType, selectedFilePath, selectedFileThumbnail } =
    useContext(CreateContext);
  return (
    <>
      <div className="create-container--content-viewport">
        <FileViewer
          fileType={selectedFileType}
          filePath={selectedFilePath}
          fileThumbnail={selectedFileThumbnail}
        />
      </div>
    </>
  );
};

export default ContentViewport;
