import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CustomTopNavbar from "@/layout/items/CustomTopNavbar";
import matchMedia from "matchmedia";
import UserContext from "@/context/user/UserContext";
import demoPersonPfp from "@/assets/media/img/demo-person.jpg";

const InboxList = () => {
  const { userInfo } = useContext(UserContext);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = matchMedia("(max-width: 950px)");
    const handleMediaQueryChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const inboxItems = {
    inbox: {
      items: [
        {
          id: 2963293620915324,
          title: "json.fiyo",
          cover: demoPersonPfp,
          last_msg: "1 new message",
        },
        {
          id: 2963293620915325, // Ensure this ID is unique
          title: "json.fiyo",
          cover: demoPersonPfp,
          last_msg: "1 new message",
        },
        {
          id: 2963293620915326, // Unique ID
          title: "json.fiyo",
          cover: demoPersonPfp,
          last_msg: "1 new message",
        },
        {
          id: 2963293620915327, // Unique ID
          title: "json.fiyo",
          cover: demoPersonPfp,
          last_msg: "1 new message",
        },
        {
          id: 2963293620915328, // Unique ID
          title: "json.fiyo",
          cover: demoPersonPfp,
          last_msg: "1 new message",
        },
      ],
    },
  };

  const renderInbox = () => {
    return inboxItems.inbox.items.map((chat) => (
      <Link key={chat.id} to={`/direct/t/${chat.id}`}>
        <div className="inbox-item">
          <img
            alt="chat-cover"
            className="inbox-item--cover"
            src={chat.cover}
          />
          <div className="inbox-item-main">
            <label className="inbox-item--title">{chat.title}</label>
            <span className="inbox-item--last-msg">{chat.last_msg}</span>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div
      className="inbox-container"
      style={isMobile ? { maxWidth: "100%" } : { maxWidth: "20rem" }}
    >
      <CustomTopNavbar
        navbarPrevPage={isMobile ? "/" : null}
        navbarTitle="demo_.person"
        navbarSecondIcon="fal fa-pen-to-square"
      />
      <div className="inbox-list">
        <b className="inbox-list--heading">Messages</b>
        {renderInbox()}
      </div>
    </div>
  );
};

export default InboxList;
