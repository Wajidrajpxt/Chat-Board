// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import loader from "../assests/loader.gif";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { setAvatarRoute } from "../utils/ApiRoute";
// import { Buffer } from "buffer";

// function SetAvatar() {
//   const api = "http://api.multiavatar.com/45678945";
//   const navigate = useNavigate();
//   const [avatar, setAvatar] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);

//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: "8000",
//     draggable: true,
//     pauseOnHover: true,
//     theme: "dark",
//   };

//   useEffect(async () => {
//     if (!localStorage.getItem("chat-app-user")) navigate("/login");
//   }, []);

//   const setProfilePicture = async () => {
//     if (selectedAvatar === undefined) {
//       toast.error("Please select an avatar", toastOptions);
//     } else {
//       const User = await JSON.parse(localStorage.getItem("chat-app-user"));
//       console.log(User,'usssssss');
//     }

//     const { data } = await axios.post(`${setAvatarRoute}/${User._id}`, {
//       image: avatar[selectedAvatar],
//     });

//     if (data.isSet) {
//       User.isAvatarImageSet = true;
//       User.avatarImage = data.image;
//       localStorage.setItem("chat-app-user", JSON.stringify(User));
//       navigate("/");
//     } else {
//       toast.error("Error setting avatar. Please try again");
//     }
//     // } catch (error) {
//     //   console.error("Error:", error);
//     //   toast.error("Error setting avatar. Please try again");
//     // }
//   };

//   useEffect(async () => {
//     // const fetchData = async () => {

//     const data = [];
//     for (let i = 0; i < 4; i++) {
//       const image = await axios.get(
//         `${api}/${Math.round(Math.random() * 1000)}`
//       );
//       const buffer = new Buffer.from(image.data);
//       data.push(buffer.toString("base64"));
//     }
//     setAvatar(data);
//     setLoading(false);

//     // if (!localStorage.getItem("chat-app-user")) navigate("/login");

//     // fetchData();
//   }, []);

//   const handleAvatarClick = (index) => {
//     setSelectedAvatar(index);
//     console.log(handleAvatarClick, "asdfgh");
//   };

//   return (
//     <>
//       {loading ? (
//         <div className="loader-container">
//           <img src={loader} alt="loader" className="loader" />
//         </div>
//       ) : (
//         <div className="h-[100vh] w-[100%] bg-[#131224] gap-5 flex justify-center items-center flex-col">
//           <div>
//             <h1 className="text-white text-2xl">
//               Pick an Avatar for Your Profile Picture
//             </h1>
//           </div>
//           <div>
//             <div className="h-[8rem] w-[35rem]   flex justify-center items-center gap-5 ">
//               {avatar.map((avatarData, index) => (
//                 <div
//                   key={index}
//                   className={`avatar ${
//                     selectedAvatar === index ? "selected" : ""
//                   }`}
//                   onClick={() => handleAvatarClick(index)}
//                 >
//                   <div className="avater">
//                     <img
//                       className="h-[120px] w-[120px]  avat "
//                       src={`data:image/svg+xml;base64,${avatarData}`}
//                       alt={`avatar-${index}`}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button className="enter" onClick={setProfilePicture}>
//             Set as Profile Picture
//           </button>
//           <ToastContainer
//             position="bottom-right"
//             autoClose={8000}
//             draggable
//             pauseOnHover
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default SetAvatar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assests/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoute";
import { Buffer } from "buffer";

function SetAvatar() {
  const api = "http://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: "8000",
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  };

  // Old Code
  // useEffect(async () => {
  //   if (!localStorage.getItem("chat-app-user")) navigate("/login");
  // }, []);

  // New Code
  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) navigate("/login");
    };

    checkUser();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    }
    const User = await JSON.parse(localStorage.getItem("chat-app-user"));

    const { data } = await axios.post(`${setAvatarRoute}/${User._id}`,{
      image: avatar[selectedAvatar],
    });

    if (data.isSet) {
      User.isAvatarImageSet = true;
      User.avatarImage = data.image;
      localStorage.setItem("chat-app-user", JSON.stringify(User));
      navigate("/");
    }
    
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("Error setting avatar. Please try again");
    // }
  };

  // useEffect(async () => {
  //   // const fetchData = async () => {

  //   const data = [];
  //   for (let i = 0; i < 4; i++) {
  //     const image = await axios.get(
  //       `${api}/${Math.round(Math.random() * 1000)}`
  //     );
  //     const buffer = new Buffer.from(image.data);
  //     data.push(buffer.toString("base64"));
  //   }
  //   setAvatar(data);
  //   setLoading(false);

  //   // if (!localStorage.getItem("chat-app-user")) navigate("/login");

  //   // fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setLoading(false);
    };

    fetchData();
  }, []);
  const handleAvatarClick = (index) => {
    setSelectedAvatar(index);
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="h-[100vh] w-[100%] bg-[#131224] gap-5 flex justify-center items-center flex-col">
          <div>
            <h1 className="text-white text-2xl">
              Pick an Avatar for Your Profile Picture
            </h1>
          </div>
          <div>
            <div className="h-[8rem] w-[35rem]   flex justify-center items-center gap-5 ">
              {avatar.map((avatarData, index) => (
                
               <div
                  key={index}
                  onClick={() => handleAvatarClick(index)}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <div className="avater">
                    <img
                      className="h-[120px] w-[120px]  avat "
                      src={`data:image/svg+xml;base64,${avatarData}`}
                      alt={`avatar-${index}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="enter" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
          <ToastContainer
            position="bottom-right"
            autoClose={8000}
            draggable
            pauseOnHover
          />
        </div>
      )}
    </>
  );
}

export default SetAvatar;
