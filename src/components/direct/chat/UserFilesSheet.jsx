import { useState } from "react";
import axios from "axios";
import Sheet from "react-modal-sheet";
import { LazyLoadImage } from "react-lazy-load-image-component";

const UserFilesSheet = ({
  openUserFilesSheet,
  isUserFilesSheetOpen,
  setIsUserFilesSheetOpen,
}) => {
  const [progress, setProgress] = useState(0);
  const [isIconLoaded, setIsIconLoaded] = useState(false);

  const uploadedFiles = {
    items: [
      {
        name: "IMG_2020-02-01.jpg",
        type: "image",
        extension: "jpg",
        size: "2.4 MB",
        src: "https://via.placeholder.com/150x250",
      },
      {
        name: "AUD_2020-08-11.mp3",
        type: "other",
        extension: "mp3",
        size: "5.6 MB",
        src: "https://via.placeholder.com/150",
      },
      {
        name: "VID_2020-05-19.mp3",
        type: "other",
        extension: "mp4",
        size: "11.3 MB",
        src: "https://via.placeholder.com/150",
      },
      {
        name: "Result.pdf",
        type: "other",
        extension: "pdf",
        size: "0.75 MB",
        src: "https://via.placeholder.com/150",
      },
      {
        name: "final-logo.docx",
        type: "other",
        extension: "svg",
        size: "0.34 MB",
        src: "https://via.placeholder.com/150",
      },
      {
        name: "landscape.blend",
        type: "other",
        extension: "blend",
        size: "67 MB",
        src: "https://via.placeholder.com/150",
      },
      {
        name: "Chemistry_Project.docx",
        type: "other",
        extension: "docx",
        size: "0.4 MB",
        src: "https://via.placeholder.com/150",
      },
      {
        name: "fwsettings.dll",
        type: "other",
        extension: "dll",
        size: "3.43 MB",
        src: "https://via.placeholder.com/150",
      },
    ],
  };

  const fivIconBaseUrl =
    "https://rawcdn.githack.com/dmhendricks/file-icon-vectors/master/dist/icons/vivid";

  const renderUploadedFiles = () => {
    return uploadedFiles.items.map((file, index) => (
      <span key={index} className="user-files--sheet-file">
        {file.type === "image" ? (
          <LazyLoadImage src={file.src} alt={file.name} />
        ) : (
          <LazyLoadImage
            name="other-file-icon"
            src={`${fivIconBaseUrl}/${file.extension}.svg`}
            alt="file-icon"
            onError={(e) => {
              e.target.onerror = null;
              const svgCode = `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <path d="M 62 10.415 L 62 489.585 C 62 495.313 66.687 500 72.415 500 L 426.585 500 C 432.313 500 437 495.313 437 489.585 L 437 145.833 L 322.415 145.833 C 316.687 145.833 312 141.145 312 135.415 L 312 0 L 72.415 0 C 66.687 0 62 4.687 62 10.415 Z" style="fill: rgb(65, 65, 65); transform-origin: 247px 250px;"/>
          <path d="M 436.479 125 C 435.959 122.915 435.436 121.355 434.395 119.792 L 332.833 6.249 L 332.833 125 L 436.479 125 Z" style="fill: rgb(65, 65, 65); transform-origin: 247px 250px;"/>
          <rect x="91.386" y="216.406" width="314.359" height="248.406" style="fill: rgb(255, 255, 255); transform-origin: 247px 250px;"/>
          <path d="M 265.39 373.995 L 223.762 373.995 L 223.762 369.505 C 223.762 361.843 224.546 355.61 226.152 350.833 C 227.762 346.005 230.157 341.671 233.333 337.715 C 236.51 333.738 243.652 326.771 254.766 316.809 C 260.687 311.585 263.635 306.802 263.635 302.474 C 263.635 298.094 262.444 294.738 260.088 292.309 C 257.691 289.915 254.105 288.708 249.276 288.708 C 244.077 288.708 239.809 290.564 236.406 294.292 C 233 297.979 230.833 304.5 229.89 313.729 L 187.365 308.016 C 188.829 291.085 194.505 277.479 204.386 267.141 C 214.292 256.819 229.49 251.678 249.944 251.678 C 265.875 251.678 278.702 255.276 288.505 262.446 C 301.785 272.208 308.446 285.168 308.446 301.375 C 308.446 308.098 306.734 314.62 303.292 320.855 C 299.886 327.088 292.855 334.749 282.266 343.734 C 274.899 350.098 270.219 355.152 268.281 359.01 C 266.375 362.809 265.39 367.833 265.39 373.995 Z M 222.313 385.99 L 266.936 385.99 L 266.936 428.605 L 222.313 428.605 L 222.313 385.99 Z" style="transform-origin: 247px 250px;"/><text style="fill: rgb(255, 255, 255); font-family: Arial; font-size: 19px; letter-spacing: 2px; stroke: rgb(255, 255, 255); stroke-width: 1.4px; white-space: pre; transform-origin: 50.9534px 73.5165px;" transform="matrix(3.104384899139, 0, 0, 5.292699813843, 192.544174743557, 429.670242492884)">${
            file.extension.length > 3
              ? file.extension.toUpperCase().slice(0, 3) + "..."
              : file.extension.toUpperCase()
          }</text>
          </svg>`;
              e.target.src = `data:image/svg+xml;base64,${btoa(svgCode)}`;
            }}
          />
        )}
      </span>
    ));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const cloudinaryUploadUrl =
        "https://api.cloudinary.com/v1_1/florixer/upload";
      const cloudinaryApiKey = "your_api_key";
      const cloudinaryUploadPreset = "your_upload_preset";

      const cloudinaryResponse = await axios.post(
        cloudinaryUploadUrl,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setProgress(percentCompleted);
          },
          params: {
            api_key: cloudinaryApiKey,
          },
        },
      );

      if (cloudinaryResponse.status === 200) {
        const { name, type, size, secure_url } = cloudinaryResponse.data;
        try {
          const yourApiEndpoint = "https://your-api-endpoint.com/upload";
          const yourApiKey = "your_api_key";
          const yourApiSecret = "your_api_secret";

          const dbApiResponse = await axios.post(
            yourApiEndpoint,
            {
              name: name,
              type: type,
              size: size,
              src: secure_url,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${yourApiKey}:${yourApiSecret}`,
              },
            },
          );

          console.log("API response:", dbApiResponse.data);
        } catch (error) {
          console.error("Error making API call:", error);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Sheet
      className="user-files--sheet"
      detent="content-height"
      isOpen={isUserFilesSheetOpen}
      onClose={() => setIsUserFilesSheetOpen(false)}
    >
      <Sheet.Container className="user-files--sheet-container">
        <Sheet.Header />
        <Sheet.Content>
          <div className="user-files--sheet-grid">
            <span className="user-files--sheet-file">
              <input
                type="file"
                accept="*/*"
                id="user-file-input"
                multiple
                hidden
              />
              <label for="user-file-input" className="fa fa-plus"></label>
              <div className="user-files--sheet-file-overlay">
                <span className="user-file-upload--progress"></span>
              </div>
            </span>
            {renderUploadedFiles()}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default UserFilesSheet;
