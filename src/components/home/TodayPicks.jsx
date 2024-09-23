import React, { useState } from "react";
import {Link } from "react-router-dom"
const TodayPicks = () => {
  const [todayPicksVisibility, setTodayPicksVisibility] = useState(true);

  const removeTodayPicks = () => {
    setTodayPicksVisibility(false);
  };
  return (
    <>
      <div
        id="today-picks"
        className={`today-picks carousel slide ${
          todayPicksVisibility ? "" : "hidden"
        }`}
        data-bs-interval="3000"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="greet-suggestion suggestion-item">
              <div className="suggestion-heading">
                <b>Jai Mata Di 🙏</b>
                <i
                  className="suggestion-heading-cross fa fa-times-circle"
                  onClick={removeTodayPicks}
                ></i>
              </div>
              <div className="hr-border"></div>
              <div className="suggestion-container">
                <label className="suggestion-txt">
                  {/*Explore more about <b>Sanatan Dharma</b> here with interactive
                  videos and photos.*/}
                  <h5>App in Development!</h5>
                  You can still explore, Just click those fuzzy icons and
                  email me for any suggestion: <br/>flexiyo02@gmail.com: <Link to="mailto:
                  flexiyo02@gmail.com" style={{color: "#1DA1F2"}}><b
                  style={{textDecoration: "underline"}}>Send
                  Email</b></Link>
                </label>
                <button className="suggestion-rdr-btn">
                  Check Now
                  <i className="fa fa-arrow-right suggestion-rdr-btn-arrow"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="song-suggestion suggestion-item">
              <div className="suggestion-heading">
                <b>Today's Song Pick</b>
                <i
                  className="suggestion-heading-cross fa fa-times-circle"
                  onClick={removeTodayPicks}
                ></i>
              </div>
              <div className="hr-border"></div>
              <div className="suggestion-container">
                <label className="suggestion-txt">
                  Listen to <b>Tu Hai Kahan</b> now and enjoy it with lyrics
                  🎵✨
                </label>
                <button className="suggestion-rdr-btn">
                  Listen Now
                  <i className="fa fa-arrow-right suggestion-rdr-btn-arrow"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="post-suggestion suggestion-item">
              <div className="suggestion-heading">
                <b>Today's Post Picks</b>
                <i
                  className="suggestion-heading-cross fa fa-times-circle"
                  onClick={removeTodayPicks}
                ></i>
              </div>
              <div className="hr-border"></div>
              <div className="suggestion-container">
                <label className="suggestion-txt">
                  Explore more <b>Photographic ideas</b> with
                  <i>@userName</i>'s posts 📷🎥
                </label>
                <button className="suggestion-rdr-btn">
                  Take me there
                  <i className="fa fa-arrow-right suggestion-rdr-btn-arrow"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="people-suggestion suggestion-item">
              <div className="suggestion-heading">
                <b>Today's People Picks</b>
                <i
                  className="suggestion-heading-cross fa fa-times-circle"
                  onClick={removeTodayPicks}
                ></i>
              </div>
              <div className="hr-border"></div>
              <div className="suggestion-container">
                <label className="suggestion-txt">
                  See whom <b>you may know</b> and share ideas and media by
                  inviting them to chat 🙋‍♂️
                </label>
                <button className="suggestion-rdr-btn">
                  See Now
                  <i className="fa fa-arrow-right suggestion-rdr-btn-arrow"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="offer-suggestion suggestion-item">
              <div className="suggestion-heading">
                <b>Today's Offer Picks</b>
                <i
                  className="suggestion-heading-cross fa fa-times-circle"
                  onClick={removeTodayPicks}
                ></i>
              </div>
              <div className="hr-border"></div>
              <div className="suggestion-container">
                <label className="suggestion-txt">
                  Explore Amazon's <b>Big Billion Days offers </b>and buy or
                  sell products here 📦💳
                </label>
                <button className="suggestion-rdr-btn">
                  Explore More
                  <i className="fa fa-arrow-right suggestion-rdr-btn-arrow"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodayPicks;
