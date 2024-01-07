import { JitsiMeeting } from "@jitsi/react-sdk";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userState, workspaceState } from "../../common/store";

function HeaderButton() {
  const [open, setOpen] = useState(false);
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
      <Button
        style={{ fontSize: "1.4rem" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Call Video
      </Button>

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
          <Button
            style={{ fontSize: "1.6rem", pointerEvents: "auto" }}
            onClick={() => {
              setIsMinimize(!isMinimize);
            }}
          >
            {isMinimize && <>Maximize</>}
            {!isMinimize && <>Minimize</>}
          </Button>
          {!isMinimize && (
            <Button style={{ fontSize: "1.6rem" }} onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HeaderButton;
