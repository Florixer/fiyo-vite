import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import kaushalKrishnaImg from "@/assets/media/img/kaushal_krishna.jpg";

export default function Post() {
  return (
    <>
      <div className="post" post-id="1">
        <div className="post-container">
          <div className="post-details">
            <div className="post-heading">
              <div className="post-profile-pic">
                <LazyLoadImage src={kaushalKrishnaImg} alt="Profile Pic" />
              </div>
              <div className="post-sub-details">
                <label className="post-username">kaushal.krishna</label>
                <div className="post-sub-heading">
                  <i className="fas fa-music"></i>
                  <label>
                    &nbsp;&nbsp;Dhundhala • Yashraj, Talwiinder, Dropped out
                  </label>
                </div>
              </div>
              <div className="post-top-right">
                <div className="post-top-right-icons">
                  <i className="far fa-2x fa-info-circle fm-small-icon"></i>
                  <i className="far fa-2x fa-ellipsis-v fm-small-icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="post-content">
            <LazyLoadImage
              alt="Post"
              src="https://demo.tiny.pictures/main/example1.jpg?width=500&height=250&resizeType=cover&gravity=0.5%2C0.38"
            />
          </div>
          <div className="post-engagement">
            <div className="engagement-container">
              <div className="engagement-bottom-left-icons">
                <div className="engaging-icon">
                  <i className="far fa-heart heart-icon"></i>
                </div>
                <div className="engaging-icon">
                  <svg
                    aria-label="Comment"
                    className="comment-icon"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
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
                </div>
                <div className="engaging-icon">
                  <svg
                    aria-label="Share Post"
                    className="share-icon"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Share Post</title>
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
                </div>
              </div>
              <div className="engagement-bottom-right-icons">
                <div className="engaging-icon">
                  <svg
                    className="save-icon"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Save Post</title>
                    <polygon
                      fill="none"
                      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></polygon>
                  </svg>
                </div>
              </div>
            </div>
            <div className="post-engagement-counts">
              <label className="likes-count">344 Likes</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
