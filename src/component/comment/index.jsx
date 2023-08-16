import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {TailSpin} from "react-loader-spinner";
import Axios from "axios"

import InputComment from "./input";
import CommentDisplay from "./comment_display";

export default function Comment() {
  const params = useParams();
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = io(process.env.REACT_APP_DEFAULT_API_URL, {
    transports: ["websocket"],
    withCredentials: true, // You might need this depending on your setup
  });

  async function fetchData() {
    try {
      const response = await Axios.get(process.env.REACT_APP_DEFAULT_API_URL +`/comment/${params.thumbsID}`);      
      setLoading(false);
     
      return response;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData().then((data) => setComment(data.data));
    socket.on("commentAdded", (newCommentData) => {
      setComment((prevComments) => [newCommentData, ...prevComments]);
    });
    return () => {
      socket.off("commentAdded");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-container w-full h-80 flex justify-center items-center" >
          <TailSpin type="Oval" color="#42b549" height={80} width={80} />
        </div>
      ) : (
        <>
          <div className="h-2/3 overflow-auto">
            {comment.map((data) => (
              <CommentDisplay
                key={data._id}
                username={data.username}
                replyComment={data.replyComment}
                time={data.time} // Assuming you have the "time" property in your comment data
              />
            ))}
          </div>
          <div className=" h-1/3">
            <InputComment socket={socket} />
          </div>
        </>
      )}
    </>
  );
}
