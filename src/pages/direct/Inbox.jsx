import { useState, useEffect } from "react";
import matchMedia from "matchmedia";
import { Modal, Avatar, Box, Typography, Button } from "@mui/material";
import InboxList from "@/components/direct/InboxList";
import axios from "axios";

const Inbox = () => {
  document.title = "Inbox • Chats";

  const [isMobile, setIsMobile] = useState(false);

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

  const [usersList, setUsersList] = useState([]);
  const [isUsersListModalOpen, setIsUsersListModalOpen] = useState(false);
  const [selectedUsersForNewRoom, setSelectedUsersForNewRoom] = useState([]);

  const fiyoauthApiBaseUri = import.meta.env.VITE_FIYOAUTH_API_BASE_URI;
  const fiyochatSrvBaseUri = import.meta.env.VITE_FIYOCHAT_SRV_BASE_URI;

  const getUsersListForNewChatRoom = async () => {
    try {
      const { data } = await axios.get(`${fiyoauthApiBaseUri}/users`, {
        headers: {
          fiyoat: JSON.parse(localStorage.getItem("userInfo")).tokens.at,
        },
      });

      setUsersList(data.data);
    } catch (error) {
      throw new Error(`Error in getUsersList: ${error}`);
    }
  };

  const createChatRoom = async (memberIds) => {
    try {
      const { data } = await axios.post(
        `${fiyochatSrvBaseUri}/api/v1/rooms/create`,
        {
          roomType: "private",
          memberIds,
        },
        {
          headers: {
            fiyoat: JSON.parse(localStorage.getItem("userInfo")).tokens.at,
          },
        },
      );
    } catch (error) {
      throw new Error(`Error in createChatRoom: ${error}`);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 0,
    maxHeight: "40%",
    overflowY: "scroll",
  };

  return (
    <section
      id="inbox"
      style={{
        display: "flex",
        borderRight: ".01rem solid var(--fm-primary-border)",
      }}
    >
      {isMobile ? (
        <InboxList />
      ) : (
        <>
          <InboxList />
          <Modal
            open={isUsersListModalOpen}
            onClose={() => setIsUsersListModalOpen(false)}
          >
            <Box sx={style}>
              <div className="flex">
                {selectedUsersForNewRoom.map((user) => {
                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between py-3 px-4 rounded-lg"
                    >
                      <div className="relative flex flex-col items-center">
                        <Avatar
                          src={user.avatar}
                          className="mb-2 mr-2"
                          sx={{ width: 50, height: 50 }}
                          alt="User Avatar"
                        />

                        <p className="text-gray-200 absolute top-0 right-0 bg-gray-950/90 py-1 px-2 z-10 rounded-full cursor-pointer">
                          &times;
                        </p>

                        <p className="text-gray-500 text-sm">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr />
              {usersList.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-3 px-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar src={user.avatar} alt="User Avatar" />
                    <div>
                      <p className="text-gray-50 font-medium">
                        {user.full_name}
                      </p>
                      <p className="text-gray-500 text-sm">@{user.username}</p>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    className="!bg-blue-500 !text-white hover:!bg-blue-600"
                    onClick={() =>
                      setSelectedUsersForNewRoom([
                        ...selectedUsersForNewRoom,
                        user,
                      ])
                    }
                  >
                    Add
                  </Button>
                </div>
              ))}
            </Box>
          </Modal>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
              width: "100%",
            }}
          >
            <svg
              className="chat-icon"
              title="Chat with your mates"
              fill="#fff"
              role="img"
              viewBox="0 0 24 24"
              style={{
                width: "7rem",
                height: "7rem",
                padding: "1.5rem",
                border: ".2rem solid var(--fm-primary-text)",
                borderRadius: "50%",
              }}
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
            <br />
            <p style={{ color: "var(--fm-primary-text-muted)" }}>
              Send a message to start a chat.
            </p>
            <br />
            <button
              style={{
                padding: ".5rem .7rem",
                fontSize: ".7rem",
                border: "none",
                borderRadius: ".3rem",
                backgroundColor: "#0095f6",
              }}
              onClick={() => {
                setIsUsersListModalOpen(true);
                getUsersListForNewChatRoom();
              }}
            >
              Send Message
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Inbox;
