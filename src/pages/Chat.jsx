import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Contacts from "../Components/Contacts";
import { allUsersRoute } from "../utils/ApiRoute";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) navigate("/login");
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const response = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            setContacts(response.data);
          } else {
            setIsLoaded(true);
            navigate("/setAvatarRoute");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentUser, navigate]);

  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    // console.log(chat);
  };

  return (
    <div className="h-screen flex justify-center items-center gap-1 bg-[#131224]">
      <div className="h-[85vh] w-[85%] bg-[green] box">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </div>
  );
}

export default Chat;
