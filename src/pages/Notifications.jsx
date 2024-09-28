import React from "react";
import matchMedia from "matchmedia";
import Headroom from "react-headroom";
import CustomTopNavbar from "@/layout/items/CustomTopNavbar";

const Notifications = () => {
  document.title = "Notifications • Flexiyo";

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

  const notificationsList = [
    {
      id: 1,
      type: "success",
      cover: "https://i.pravatar.cc/30",
      title: "Congratulations! Your account has been created.",
      actions: [
        {
          type: "button",
          text: "Get Started",
        },
      ],
      time: "2h",
    },
    {
      id: 1,
      type: "normal",
      cover: "https://i.pravatar.cc/25",
      title: "@username has requested to follow you.",
      actions: [
        {
          type: "button",
          text: "Deny",
        },
        {
          type: "button",
          text: "Accept",
        },
      ],
      time: "13h",
    },
    {
      id: 1,
      type: "normal",
      cover: "https://i.pravatar.cc/20",
      title: "@username has requested to follow you.",
      actions: [
        {
          type: "button",
          text: "Deny",
        },
        {
          type: "button",
          text: "Accept",
        },
      ],
      time: "4d",
    },
    {
      id: 1,
      type: "normal",
      cover: "https://i.pravatar.cc/15",
      title: "@username has requested to follow you.",
      actions: [
        {
          type: "button",
          text: "Deny",
        },
        {
          type: "button",
          text: "Accept",
        },
      ],
      time: "7d",
    },
    {
      id: 1,
      type: "normal",
      cover: "https://i.pravatar.cc/10",
      title: "@username has requested to follow you.",
      actions: [
        {
          type: "button",
          text: "Deny",
        },
        {
          type: "button",
          text: "Accept",
        },
      ],
      time: "8d",
    },
    {
      id: 1,
      type: "normal",
      cover: "https://i.pravatar.cc/5",
      title:
        "@username, @hesman and 28 others have liked your comment : Oo Good Idea!...",
      time: "2h",
      actions: [
        {
          type: "button",
          text: "See now",
        },
      ],
    },
  ];

  const renderNotifications = () => {
    return notificationsList.map((notification, index) => {
      return (
        <div className="notification" key={index}>
          <div className="notification-cover">
            <img src={notification.cover} />
          </div>
          <div className="notification-body">
            <div className="notification-body--title">
              {notification.title} &nbsp;
              <span className="notification-body--time">
                {notification.time}
              </span>
            </div>
            <div className="notification-body--actions">
              {notification.actions
                ? notification.actions.map((action, index) => {
                    return (
                      <button
                        type="button"
                        key={index}
                        className="notification-body--actions-btn"
                        style={{
                          color:
                            action.text === "Deny"
                              ? "var(--fm-primary-text-muted)"
                              : "var(--fm-primary-link)",
                        }}
                      >
                        {action.text}
                      </button>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <section id="notifications">
      {isMobile ? (
        <Headroom>
          <CustomTopNavbar
            navbarPrevPage={"/"}
            navbarTitle="Notifications"
            navbarFirstIcon="fa fa-plus"
            navbarSecondIcon="fa fa-bell"
            setBorder
          />
        </Headroom>
      ) : null}
      <div className="notifications-list">{renderNotifications()}</div>
    </section>
  );
};

export default Notifications;
