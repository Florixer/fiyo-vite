import React, { useState, useContext, useEffect } from "react";
import UserContext from "@/context/user/UserContext";

const ProtectedElement = ({ children }) => {
  const { isUserAuthenticated } = useContext(UserContext);
  const [showModal, setShowModal] = useState(!isUserAuthenticated);

  useEffect(() => {
    setShowModal(!isUserAuthenticated);
  }, [isUserAuthenticated]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {isUserAuthenticated ? (
        children
      ) : (
        showModal && (
          <div style={modalStyles}>
            <div style={modalContentStyles}>
              <h2>Unauthorized</h2>
              <p>You are not authorized to view this content.</p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const modalStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  textAlign: "center",
};

export default ProtectedElement;
