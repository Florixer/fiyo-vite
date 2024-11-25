import React, { useContext } from "react";
import Headroom from "react-headroom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CustomTopNavbar from "@/layout/items/CustomTopNavbar";
import UserContext from "@/context/user/UserContext";

export default function Profile() {
  const { userInfo } = useContext(UserContext);

  document.title = `@${userInfo.username} • Flexiyo`;

  const followBtnClick = (e) => {
    if (e.target.getAttribute("value") === "Follow") {
      e.target.classList.remove("user-card-btn--follow");
      e.target.classList.add("user-card-btn--following");
      e.target.setAttribute("value", "Following");
    } else {
      e.target.classList.add("user-card-btn--follow");
      e.target.classList.remove("user-card-btn--following");
      e.target.setAttribute("value", "Follow");
    }
  };
  const commateBtnClick = (e) => {
    if (e.target.getAttribute("value") === "Commate") {
      e.target.classList.remove("user-card-btn--commate");
      e.target.classList.add("user-card-btn--commated");
      e.target.setAttribute("value", "Commated");
    } else {
      e.target.classList.add("user-card-btn--commate");
      e.target.classList.remove("user-card-btn--commated");
      e.target.setAttribute("value", "Commate");
    }
  };
  return (
    <section id="profile">
      <Headroom>
        <CustomTopNavbar
          navbarCover={userInfo.avatar}
          navbarTitle="Profile"
          navbarFirstIcon="fa fa-plus"
          navbarSecondIcon="fa fa-gear"
        />
      </Headroom>
      <div className="profile-container">
        <div
          className="profile-container--banner"
          style={{ background: `url(${userInfo.banner})` }}
        ></div>
        <div className="profile-user">
          <div className="user-card">
            <div className="user-card--avatar">
              <LazyLoadImage src={userInfo.avatar} alt="User-Avatar"/>
            </div>
            <div className="user-card-connections">
              <div className="user-card-connections-items">
                <div className="user-card-connections--item">
                  <h4>14</h4>
                  <span>Mates</span>
                </div>
                <div className="user-card-connections--item">
                  <h4>32</h4>
                  <span>Followers</span>
                </div>
                <div className="user-card-connections--item">
                  <h4>79</h4>
                  <span>Following</span>
                </div>
              </div>
              <div className="user-card-btn">
                <input
                  type="button"
                  className="user-card-btn--follow"
                  value="Follow"
                  onClick={followBtnClick}
                />
                <input
                  type="button"
                  className="user-card-btn--commate"
                  value="Commate"
                  onClick={commateBtnClick}
                />
              </div>
            </div>
          </div>
          <div className="user-block">
            <div className="user-details">
              <span className="user-details--name">{userInfo.fullName}</span>
              <span className="user-details--username">@{userInfo.username}</span>
              <span className="user-details--about">
                {userInfo.bio}
              </span>
            </div>
            <div className="user-block-right">
              <div className="user-block-btns">
                <i className="user-block--btn far fa-message-lines"></i>
                <i className="user-block--btn far fa-info-circle"></i>
              </div>
              <div className="user-block-links">
                <span className="user-block--link">
                  <i className="far fa-paperclip"></i>
                </span>
                <span className="user-block--link">
                  <i className="far fa-paperclip"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="user-posts">
            <span className="user-posts--label">Posts (15)</span>
            <div className="user-posts-grid">
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/500x500"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/450x450"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/300x300"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/350x350"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/200x200"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/600x600"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/550x550"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/100x100"
                />
              </span>
              <span className="user-posts-grid--cell">
                <LazyLoadImage
                  alt="Post"
                  src="https://source.unsplash.com/random/150x150"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
