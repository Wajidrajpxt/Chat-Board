import React from "react";
import styled from "styled-components";
import Logout from "../Components/Logout";

export default function ChatContainer({ currentChat }) {
  console.log(currentChat,'ccccccc');
  return (
    <>
      <h1 className="text-white">ChatContainer</h1>
      {currentChat && (
        <Container className="">
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>
          <div className="chat-message">ssss</div>
          <div className="cht-input"></div>
          <Logout />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
  }
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .avatar img {
    height: 3rem;
  }
  .username h3 {
    color: white;
  }
`;
