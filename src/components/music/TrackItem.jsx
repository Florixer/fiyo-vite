import { useState, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MusicContext from "@/context/music/MusicContext";
import useMusicUtility from "@/utils/music/useMusicUtility";
const TrackItem = ({ id, track, index, onOpenDownloadModal }) => {
  const { contentQuality } = useContext(MusicContext);
  const { getTrack } = useMusicUtility();
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  const handleItemClick = (event) => {
    if (!event.target.classList.contains("fa-arrow-circle-down")) {
      getTrack(track.id);
    }
  };

  const handleDownloadClick = async (trackId) => {
    setIsDownloadLoading(true);
    await onOpenDownloadModal(trackId);
    setIsDownloadLoading(false);
  };

  return (
    <div
      className="track-item"
      onClick={handleItemClick}
      id={`trackItem${index}`}
    >
      <div className="track-item-box">
        <div className="track-item--cover">
          <LazyLoadImage
            src={
              Array.isArray(track.image)
                ? contentQuality === "low"
                  ? track.image[0].url
                  : contentQuality === "normal"
                    ? track.image[1].url
                    : contentQuality === "high"
                      ? track.image[2].url
                      : track.image[1].url
                : track.image
            }
            alt="Track Image"
          />
        </div>
        <div className="track-item--details">
          <span className="track-item--details-name">{track.name}</span>
          <div className="track-item--details-artists">
            <span className="track-item--details-artists-item" key={index}>
              {track.artists.primary
                ? track.artists.primary.length > 1
                  ? track.artists.primary
                      .map((artist) => artist.name)
                      .join(", ")
                  : track.artists.primary.map((artist) => artist.name)
                : track.artists}
            </span>
          </div>
        </div>
        <div className="track-item--details-download">
          {isDownloadLoading && (
            <div className="track-item--details-download-preloader"></div>
          )}
          <i
            className="far fa-arrow-circle-down fm-small-icon"
            style={{ fontSize: "1.3rem" }}
            onClick={() => handleDownloadClick(track.id)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
