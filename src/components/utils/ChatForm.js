/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import "../../styles/components/utils/ChatForm.css";
import { IconButton } from "@mui/material";
import { MdClose, MdOutlineSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addChat,
  appendChats,
  chatState,
  deleteChat,
  userState,
  workspaceState,
} from "../../common/store";
import { useEffect, useRef, useState } from "react";
import { getChatsByParent } from "../../apis/chat-api";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa6";

function ChatForm({ handleClose, open }) {
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const chatRef = useRef();
  const chats = useSelector(chatState);
  const me = useSelector(userState);
  const wp = useSelector(workspaceState);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      dispatch(
        appendChats(await getChatsByParent(wp.parent.id, 5, currentPage))
      );
    };

    init();
  }, [wp, currentPage]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chats]);

  const handleSend = () => {
    if (content?.trim()) {
      dispatch(
        addChat({
          id: uuidv4(),
          content: content,
          belongTo: me.email,
          parent: wp.parent.id,
          createdDate: Date.now(),
        })
      );
    }

    setContent("");
  };

  const dateRender = (timestamp) => {
    const date = new Date(timestamp);
    return (
      `${date.getDate()}`.padStart(2, "0") +
      "/" +
      `${date.getMonth() + 1}`.padStart(2, "0") +
      "/" +
      date.getFullYear() +
      " " +
      `${date.getHours()}`.padStart(2, "0") +
      ":" +
      `${date.getMinutes()}`.padStart(2, "0") +
      ":" +
      `${date.getSeconds()}`.padStart(2, "0")
    );
  };

  return createPortal(
    <div
      style={{
        display: `${open ? "flex" : "none"}`,
        position: "absolute",
        bottom: "5%",
        right: "5%",
        flexDirection: "column",
        width: "40rem",
        height: "60rem",
        backgroundColor: "#fff",
        borderRadius: ".4rem",
        padding: "2.4rem 3.4rem",
        justifyContent: "space-between",
        boxShadow: "0 0 2px #333",
      }}
    >
      <div
        className="chat-container"
        ref={chatRef}
        onScroll={async (e) => {
          if (e.target.scrollTop === 0) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        {chats.map((chat) => {
          return (
            <div
              key={chat?.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              {chat.belongTo === me.email && (
                <div
                  onClick={() => {
                    dispatch(deleteChat(chat));
                  }}
                >
                  <IconButton aria-label="send" size="large" onClick={() => {}}>
                    <FaTrash size={14} color="#dc4141" />
                  </IconButton>
                </div>
              )}

              <div
                className={`chat-element ${
                  chat.belongTo === me.email ? "chat-me" : ""
                }`}
                style={{ flex: 1 }}
              >
                <div className="chat-owner">{chat.belongTo}</div>
                <div className="chat-content">{chat.content}</div>
                <div className="chat-date">{dateRender(chat.createdDate)}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-action">
        <hr style={{ margin: "1rem 0", opacity: 0 }} />
        <input
          type="text"
          style={{
            border: "1px solid #ccc",
            outline: "none",
            padding: "1.2rem 1.2rem",
            borderRadius: ".4rem",
            width: "100%",
            margin: "1rem 0",
            fontSize: "1.4rem",
          }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <div className="chat-button-container">
          <IconButton onClick={handleClose} aria-label="send" size="large">
            <MdClose size={24} color="#dc4941" />
          </IconButton>
          <IconButton aria-label="send" size="large" onClick={handleSend}>
            <MdOutlineSend size={24} color="#4184dc" />
          </IconButton>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ChatForm;
