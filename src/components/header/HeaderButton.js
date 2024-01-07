import { JitsiMeeting } from "@jitsi/react-sdk";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userState, workspaceState } from "../../common/store";
import ChatForm from "../utils/ChatForm";
import { MdChatBubbleOutline, MdClose, MdPersonalVideo } from "react-icons/md";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

function HeaderButton() {
  const [open, setOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const { parent } = useSelector(workspaceState);
  const user = useSelector(userState);
  const [isMinimize, setIsMinimize] = useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <IconButton
          onClick={() => {
            setOpenChat(true);
          }}
          aria-label="send"
          size="large"
        >
          <MdChatBubbleOutline size={24} color="#4a4a4a" />
        </IconButton>

        <IconButton onClick={handleClickOpen} aria-label="send" size="large">
          <MdPersonalVideo size={24} color="#4a4a4a" />
        </IconButton>
      </div>

      <Dialog
        open={open}
        fullScreen={!isMinimize}
        hideBackdrop={isMinimize}
        style={
          isMinimize ? { top: "80%", right: "-80%", pointerEvents: "none" } : {}
        }
      >
        <DialogContent>
          <JitsiMeeting
            roomName={parent.id}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: true,
              enableEmailInStats: false,
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            }}
            userInfo={{
              displayName: user.email,
            }}
            onApiReady={(externalApi) => {}}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "100%";
            }}
          />
        </DialogContent>
        <DialogActions>
          {!isMinimize && (
            <IconButton onClick={handleClose} aria-label="send" size="large">
              <MdClose size={24} color="#dc4941" />
            </IconButton>
          )}
          <Button
            style={{ fontSize: "1.6rem", pointerEvents: "auto" }}
            onClick={() => {
              setIsMinimize(!isMinimize);
            }}
          >
            {isMinimize && (
              <IconButton size="large">
                <FiMaximize2 size={24} color="#393939" />
              </IconButton>
            )}
            {!isMinimize && (
              <IconButton size="large">
                <FiMinimize2 size={24} color="#393939" />
              </IconButton>
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <ChatForm
        open={openChat}
        handleClose={() => {
          setOpenChat(false);
        }}
      />
    </>
  );
}

export default HeaderButton;
