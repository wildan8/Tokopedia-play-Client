import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function InputComment({ socket }) {
  const [dataUsername, setUsername] = useState("");
  const [dataReplyComment, setReplyComment] = useState("");
  const params = useParams();
  const thumbs =params.thumbsID

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_DEFAULT_API_URL}/comment/${params.thumbsID}`,
        {
          username: dataUsername,
          replyComment: dataReplyComment,
          thumbsID: params.thumbsID,
        }
      );

      if (response.status === 201) {
        console.log("Item added successfully");

        socket.emit("commentAdded", {
          dataUsername,
          dataReplyComment,
          thumbs,
        });

        setReplyComment("");
        setUsername("");
      } else {
        console.error("Error adding item", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      <div className="z-40 absolute self-center bottom-0 w-full top-shadow-lg  pt-3 bg-lightGrey  border-t border-t-darkTokPed">
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            className="border border-solid rounded-lg ml-3 w-11/12 my-3 p-1"
            type="text"
            value={dataUsername}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            name="replyComment"
            className="block border border-solid rounded-lg max-h-20 min-h-10 w-11/12  mx-3 p-2"
            type="text"
            value={dataReplyComment}
            placeholder="comment . . ."
            onChange={(e) => setReplyComment(e.target.value)}
          />
          <div className="m-3">
            <button
              className="bg-green-tokopedia rounded text-white w-full"
              type="submit"
              disabled={!dataUsername || !dataReplyComment}
            >
              <div className="p-2">Kirim Komentar</div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
