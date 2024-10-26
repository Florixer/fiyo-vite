import React from "react";
import Headroom from "react-headroom";
import { Link } from "react-router-dom";
import matchMedia from "matchmedia";
import logo from "@/assets/media/img/logo/flexiyo.svg";
const HomeNavbar = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 600px)");
    const handleMediaQueryChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);
  
  return (
    <Headroom>
      <header id="header" className="home-navbar">
        <div className="left">
          {isMobile ? (
            <div className="logo">
              <Link to="/">
                <img
                  src={logo}
                  id="logo-img"
                  title="Flexiyo - Flex in Your Onset"
                  alt="Flexiyo Logo"
                />
              </Link>
            </div>
          ) : null}
        </div>
        <div className="right">
          <div className="auth-user">
            <i className="top-nav-icon">
              <Link to="/stories">
                <svg
                  className="stories-icon"
                  title="See Stories"
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M12.1213 7.40686C10.6607 6.40269 8.64684 6.54986 7.34835 7.84835 5.88388 9.31282 5.88388 11.6872 7.34835 13.1517L11.591 17.3943C11.7316 17.5349 11.9224 17.614 12.1213 17.614 12.3202 17.614 12.511 17.5349 12.6517 17.3943L16.8943 13.1517C18.3588 11.6872 18.3588 9.31282 16.8943 7.84835 15.5958 6.54986 13.582 6.40269 12.1213 7.40686zM11.591 8.90901C10.7123 8.03033 9.28769 8.03033 8.40901 8.90901 7.53033 9.78769 7.53033 11.2123 8.40901 12.091L12.1213 15.8033 15.8336 12.091C16.7123 11.2123 16.7123 9.78769 15.8336 8.90901 14.955 8.03033 13.5303 8.03033 12.6517 8.90901 12.3588 9.2019 11.8839 9.2019 11.591 8.90901zM10.2263 2.128C10.3296 2.52914 10.0881 2.93802 9.68694 3.04127 9.19056 3.16903 8.7103 3.33698 8.24979 3.54149 7.87123 3.7096 7.42806 3.539 7.25994 3.16044 7.09183 2.78187 7.26243 2.3387 7.64099 2.17059 8.17667 1.9327 8.73547 1.73727 9.31306 1.58861 9.7142 1.48537 10.1231 1.72686 10.2263 2.128zM5.75633 4.15238C6.03781 4.45625 6.01966 4.93078 5.71579 5.21226 4.97148 5.90172 4.34093 6.71184 3.85525 7.61113 3.65841 7.97559 3.2034 8.11148 2.83894 7.91464 2.47448 7.71781 2.33859 7.26279 2.53543 6.89834 3.1 5.85298 3.83243 4.91218 4.69645 4.11183 5.00032 3.83035 5.47485 3.8485 5.75633 4.15238zM2.25612 9.61903C2.66481 9.6865 2.94142 10.0725 2.87396 10.4812 2.79247 10.9748 2.75 11.4821 2.75 11.9999 2.75 12.5177 2.79247 13.025 2.87396 13.5186 2.94142 13.9273 2.66481 14.3133 2.25612 14.3808 1.84744 14.4482 1.46145 14.1716 1.39399 13.7629 1.29922 13.1888 1.25 12.5998 1.25 11.9999 1.25 11.4 1.29922 10.811 1.39399 10.2369 1.46145 9.82819 1.84744 9.55157 2.25612 9.61903zM2.83894 16.0851C3.2034 15.8883 3.65841 16.0242 3.85525 16.3887 4.34093 17.288 4.97147 18.0981 5.71578 18.7875 6.01966 19.069 6.03781 19.5435 5.75633 19.8474 5.47485 20.1513 5.00032 20.1694 4.69644 19.888 3.83243 19.0876 3.1 18.1468 2.53543 17.1015 2.33859 16.737 2.47448 16.282 2.83894 16.0851zM7.25994 20.8394C7.42805 20.4608 7.87122 20.2902 8.24979 20.4583 8.7103 20.6628 9.19056 20.8308 9.68694 20.9585 10.0881 21.0618 10.3296 21.4707 10.2263 21.8718 10.1231 22.2729 9.7142 22.5144 9.31306 22.4112 8.73547 22.2625 8.17667 22.0671 7.64099 21.8292 7.26243 21.6611 7.09183 21.2179 7.25994 20.8394z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M11.25 2C11.25 1.58579 11.5858 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75C21.5858 12.75 21.25 12.4142 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C11.5858 2.75 11.25 2.41421 11.25 2ZM21.4682 15.3127C21.8478 15.4786 22.021 15.9207 21.8552 16.3003C20.197 20.0954 16.4094 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22C11.25 21.5858 11.5858 21.25 12 21.25C15.7919 21.25 19.0526 18.9682 20.4806 15.6997C20.6465 15.3202 21.0886 15.1469 21.4682 15.3127Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </i>
            <i className="top-nav-icon">
              <Link to="/music">
                <svg
                  className="music-icon"
                  title="Play Music"
                  width="800px"
                  height="800px"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29 6V35"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 36.04C15 33.2565 17.2565 31 20.04 31H29V36.96C29 39.7435 26.7435 42 23.96 42H20.04C17.2565 42 15 39.7435 15 36.96V36.04Z"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29 14.0664L41.8834 17.1215V9.01339L29 6V14.0664Z"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 8H20"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 16H20"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 24H16"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </i>
            <i className="top-nav-icon">
              <Link to="/notifications">
                <svg
                  className="notifications-icon"
                  title="Notifications"
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect id="view-box" width="24" height="24" fill="none" />
                  <path
                    fill="#ffffff"
                    id="Shape"
                    d="M6,17v-.5H2.25A2.253,2.253,0,0,1,0,14.25v-.382a2.542,2.542,0,0,1,1.415-2.289A1.247,1.247,0,0,0,2.1,10.572l.446-4.91A6.227,6.227,0,0,1,10.618.286a5.477,5.477,0,0,0-.635,1.374A4.794,4.794,0,0,0,8.75,1.5,4.7,4.7,0,0,0,4.045,5.8L3.6,10.708A2.739,2.739,0,0,1,2.089,12.92a1.055,1.055,0,0,0-.589.949v.382A.751.751,0,0,0,2.25,15h13A.751.751,0,0,0,16,14.25v-.382a1.053,1.053,0,0,0-.586-.948A2.739,2.739,0,0,1,13.9,10.708l-.2-2.18a5.473,5.473,0,0,0,1.526.221l.166,1.822a1.26,1.26,0,0,0,.686,1.005,2.547,2.547,0,0,1,1.418,2.29v.382a2.252,2.252,0,0,1-2.25,2.25H11.5V17A2.75,2.75,0,0,1,6,17Zm1.5,0A1.25,1.25,0,0,0,10,17v-.5H7.5ZM15.047,6.744A3.486,3.486,0,0,1,13.5,6.28L13.456,5.8a4.7,4.7,0,0,0-1.648-3.185,3.5,3.5,0,0,1,.61-1.417A6.221,6.221,0,0,1,14.95,5.662l.1,1.081v0Z"
                    transform="translate(3.25 2.25)"
                  />
                  <path
                    d="M3.5,7A3.5,3.5,0,1,1,7,3.5,3.5,3.5,0,0,1,3.5,7Z"
                    fill="#ff6359"
                    transform="translate(15 2)"
                  />
                </svg>
              </Link>
            </i>
            {/*<i className="top-nav-icon">
                         <Link to="/notifications">
                        <svg
                            className="notification-icon"
                            title="No Notifications"
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            id="_24x24_On_Light_Notification-Alert"
                            dataName="24x24/On Light/Notification-Alert"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                id="view-box"
                                width="24"
                                height="24"
                                fill="none"
                            />
                            <path
                                fill="#ffffff"
                                id="Shape"
                                d="M 6 17 L 6 16.5 L 2.25 16.5 C 1.008 16.498 0.002 15.492 0 14.25 L 0 13.868 C -0.004 12.897 0.545 12.009 1.415 11.579 C 1.803 11.385 2.062 11.004 2.1 10.572 L 2.546 5.662 C 2.905 1.705 6.828 -0.907 10.618 0.286 C 10.344 0.712 10.13 1.175 9.983 1.66 C 9.581 1.553 9.166 1.5 8.75 1.5 C 6.301 1.489 4.253 3.36 4.045 5.8 L 3.6 10.708 C 3.516 11.658 2.943 12.496 2.089 12.92 C 1.728 13.098 1.499 13.466 1.5 13.869 L 1.5 14.251 C 1.501 14.665 1.836 14.999 2.25 15 L 15.25 15 C 15.664 14.999 15.999 14.664 16 14.25 L 16 13.868 C 16.002 13.466 15.774 13.098 15.414 12.92 C 14.558 12.497 13.985 11.659 13.9 10.708 L 13.7 8.528 C 14.196 8.673 14.709 8.748 15.226 8.749 L 15.392 10.571 C 15.433 11.002 15.692 11.381 16.078 11.576 C 16.949 12.007 17.499 12.895 17.496 13.866 L 17.496 14.248 C 17.495 15.49 16.488 16.497 15.246 16.498 L 11.5 16.498 L 11.5 17 C 11.5 19.117 9.208 20.44 7.375 19.382 C 6.524 18.89 6 17.982 6 17 Z M 7.5 17 C 7.5 17.962 8.542 18.564 9.375 18.083 C 9.762 17.859 10 17.447 10 17 L 10 16.5 L 7.5 16.5 L 7.5 17 Z M 15.192 8.771 C 14.647 8.74 14.153 8.835 13.681 8.561 L 13.528 5.872 C 13.879 4.453 11.191 2.335 9.998 1.637 C 10.093 1.125 10.266 0.678 10.572 0.257 C 12.529 1.107 15.243 3.697 14.95 5.662 L 15.05 6.743 L 15.192 8.771 Z"
                                transform="translate(3.25 2.25)"
                            ></path>
                        </svg>
                    </Link> 
                    </i>*/}
            <i className="top-nav-icon">
              <Link to="/direct/inbox">
                <svg
                  className="chat-icon"
                  title="Chat with your mates"
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="#ffffff" strokeWidth="1.5">
                    <path d="M20 12c0-3.771 0-5.657-1.172-6.828C17.657 4 15.771 4 12 4C8.229 4 6.343 4 5.172 5.172C4 6.343 4 8.229 4 12v6c0 .943 0 1.414.293 1.707C4.586 20 5.057 20 6 20h6c3.771 0 5.657 0 6.828-1.172C20 17.657 20 15.771 20 12z"></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 10h6m-6 4h3"
                    ></path>
                  </g>
                </svg>
              </Link>
            </i>
          </div>
        </div>
      </header>
    </Headroom>
  );
};

export default HomeNavbar;
