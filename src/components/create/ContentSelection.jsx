import { useState, useEffect, useContext } from "react";
import { Capacitor } from "@capacitor/core";
import { Filesystem } from "@capacitor/filesystem";
import { Gallery } from "react-grid-gallery";
import { VideoThumbnailGenerator } from "browser-video-thumbnail-generator";
import CreateContext from "@/context/create/CreateContext";
import {
  fetchAlbums,
  readAllFiles,
} from "@/services/android/fileListingService.js";

const ContentSelection = () => {
  const { selectedFileType } = useContext(CreateContext);
  const [mediaFiles, setMediaFiles] = useState({});

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      getAllFiles();
    }
  }, []);

  const getAllFiles = async () => {
    const albums = await fetchAlbums();
    const files = await readAllFiles(albums);
    setMediaFiles(files);
  };

  return (
    <div className="create-container--content-selection">
      <FileTypeSelector />
      <div className="create-content-selection--container">
        {Capacitor.isNativePlatform() && selectedFileType === "image" ? (
          <ImagesGrid mediaImages={mediaFiles.images} />
        ) : Capacitor.isNativePlatform() && selectedFileType === "video" ? (
          <VideosGrid mediaVideos={mediaFiles.videos} />
        ) : Capacitor.isNativePlatform() && selectedFileType === "audio" ? (
          function () {}
        ) : null}
      </div>
    </div>
  );
};

const FileTypeSelector = () => {
  const { selectedFileType, setSelectedFileType } = useContext(CreateContext);
  const handleFileTypeSelect = (type) => {
    setSelectedFileType(type);
  };

  return (
    <div className="file-type--selector">
      <div
        className="file-type--selector-item"
        style={{
          backgroundColor:
            selectedFileType === "image" && "var(--fm-secondary-bg-color)",
        }}
        onClick={() => handleFileTypeSelect("image")}
      >
        Images
      </div>
      <div
        className="file-type--selector-item"
        style={{
          backgroundColor:
            selectedFileType === "video" && "var(--fm-secondary-bg-color)",
        }}
        onClick={() => handleFileTypeSelect("video")}
      >
        Videos
      </div>
      <div
        className="file-type--selector-item"
        style={{
          backgroundColor:
            selectedFileType === "audio" && "var(--fm-secondary-bg-color)",
        }}
        onClick={() => handleFileTypeSelect("audio")}
      >
        Audios
      </div>
    </div>
  );
};

const ImagesGrid = ({ mediaImages }) => {
  const { setSelectedFilePath } = useContext(CreateContext);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchAndMapImages = async () => {
      const slicedMediaImages = mediaImages.slice(0, 100);
      const mappedImages = [];

      for (const image of slicedMediaImages) {
        try {
          const fileContents = await Filesystem.readFile({
            path: image.uri,
          });

          const newImage = {
            src: `data:image/png;base64,${fileContents.data}`,
            isSelected: false,
          };

          mappedImages.push(newImage);

          // Update the state incrementally
          setImages((prevImages) => [...prevImages, newImage]);

          // Set the first image as selected file path
          if (mappedImages.length === 1) {
            setSelectedFilePath(newImage.src);
          }
        } catch (error) {
          console.error("Error reading file:", error);
          // Handle error appropriately (e.g., show a notification or log it)
        }
      }
    };

    const timerId = setTimeout(() => {
      fetchAndMapImages();
    }, 2000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timerId);
  }, [mediaImages, setSelectedFilePath]);

  const handleImageSelect = (index) => {
    const nextImages = images.map((image, i) => ({
      ...image,
      isSelected: i === index,
    }));
    setImages(nextImages);
    setSelectedFilePath(images[index].src);
  };

  return Capacitor.isNativePlatform() ? (
    <Gallery
      images={images}
      rowHeight={140}
      onClick={(index) => handleImageSelect(index)}
    />
  ) : (
    <div>Upload a file here! </div>
  );
};

const VideosGrid = ({ mediaVideos }) => {
  const { setSelectedFilePath, setSelectedFileThumbnail } =
    useContext(CreateContext);

  const [videoThumbnails, setVideoThumbnails] = useState(
    mediaVideos.map((video) => ({
      filePath: video.uri,
      isSelected: false,
    })),
  );

  useEffect(() => {
    const generateThumbnails = async () => {
      const updatedThumbnails = await Promise.all(
        videoThumbnails.map(async (videoInfo) => {
          const thumbnailInfo = await generateVideoThumbnail(
            videoInfo.filePath,
          );
          return {
            ...videoInfo,
            src: thumbnailInfo.thumbnail,
            width: thumbnailInfo.width,
            height: thumbnailInfo.height,
          };
        }),
      );
      setVideoThumbnails(updatedThumbnails);
    };

    if (videoThumbnails.length > 0) {
      generateThumbnails();
    }
  }, [videoThumbnails]);

  const generateVideoThumbnail = async (videoSrc) => {
    try {
      const thumbnailInfo = await new VideoThumbnailGenerator(
        videoSrc,
      ).getThumbnail(5);

      return thumbnailInfo;
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      return null;
    }
  };

  useEffect(() => {
    setSelectedFilePath(videoThumbnails[0].filePath);
    videoThumbnails[0].isSelected = true;
  }, [setSelectedFilePath, videoThumbnails]);

  const handleVideoThumbSelect = (index) => {
    const nextVideoThumbs = videoThumbnails.map((videoThumb, i) => ({
      ...videoThumb,
      isSelected: i === index,
    }));
    setVideoThumbnails(nextVideoThumbs);
    setSelectedFilePath(videoThumbnails[index].filePath);
    setSelectedFileThumbnail(videoThumbnails[index].src);
  };
  return (
    <>
      {Capacitor.isNativePlatform() && videoThumbnails.length !== 0 ? (
        <Gallery
          images={videoThumbnails}
          rowHeight={140}
          onClick={(index) => handleVideoThumbSelect(index)}
        />
      ) : (
        <div>No files here, upload one</div>
      )}
    </>
  );
};
// const AudiosGrid = ({ mediaAudios }) => {
//   const {
//     selectedFileType,
//     selectedFilePath,
//     setSelectedFilePath,
//     setSelectedFileThumbnail,
//   } = useContext(CreateContext);

//   useEffect(() => {
//     const extractAudioThumbnails = () => {};
//     extractAudioThumbnails();
//   }, []);

//   const [audioThumbnails, setAudioThumbnails] = useState(
//     mediaAudios.map((audio) => ({
//       filePath: audio.uri,
//       isSelected: false,
//     })),
//   );

//   useEffect(() => {
//     setSelectedFilePath(audioThumbnails[0].filePath);
//   }, [setSelectedFilePath, audioThumbnails]);

//   const handleAudioThumbSelect = (index) => {
//     const nextAudioThumbs = audioThumbnails.map((audioThumb, i) => ({
//       ...audioThumb,
//       isSelected: i === index,
//     }));
//     setAudioThumbnails(nextAudioThumbs);
//     setSelectedFilePath(audioThumbnails[index].filePath);
//     setSelectedFileThumbnail(audioThumbnails[index].src);
//   };
//   return (
//     <div>
//       {audioThumbnails.length !== 0 ? (
//         <Gallery
//           images={audioThumbnails}
//           rowHeight={140}
//           onClick={(index) => handleAudioThumbSelect(index)}
//         />
//       ) : (
//         <div>No files here, upload one</div>
//       )}
//     </div>
//   );
// };

export default ContentSelection;
