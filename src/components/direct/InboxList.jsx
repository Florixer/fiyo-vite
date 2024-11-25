import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomTopNavbar from "@/layout/items/CustomTopNavbar";
import matchMedia from "matchmedia";
import UserContext from "@/context/user/UserContext";

const InboxList = () => {
  const { inboxItems, setInboxItems } = useContext(UserContext);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
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

  const renderInbox = () => {
    return inboxItems.map((item) => (
      <Link to={`/direct/t/${item.id}`} key={item.id}>
        <div className="flex flex-row mb-3 py-1">
          <img
            alt="Profile Picture"
            className="w-12 h-12 rounded-full mr-3 object-cover"
            src={item.pfp}
          />
          <div className="flex flex-col w-full">
            <label className="inbox-item--title">{item.name}</label>
            <span
              className={`text-sm mt-1 break-words text-gray-500 ${
                !item.seen ? "font-bold text-white" : ""
              }`}
            >
              {item.last_msg}
            </span>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div
      className="max-w-80 w-full border-r border-gray-700"
      style={isMobile ? { maxWidth: "100%" } : { maxWidth: "20rem" }}
    >
      <CustomTopNavbar
        navbarPrevPage={isMobile ? "/" : null}
        navbarTitle="demo_.person"
        navbarSecondIcon="fal fa-pen-to-square"
      />
      <b className="px-3">Messages</b>
      <div className="px-3 py-2">{renderInbox()}</div>
    </div>
  );
};

export default InboxList;
