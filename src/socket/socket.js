import { io } from "socket.io-client";
import { SERVER_URL } from "../config";
import {
  addChat,
  addComponent,
  deleteChat,
  deleteComponent,
  setParent,
  updateComponent,
} from "../common/store";

export const socket = io(SERVER_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export const join = ({ room, user }) => {
  socket.emit("join", { room, user });
};

export const subscribeReceive = (event, dispatch) => {
  socket.on(event, (data) => {
    console.log("Receive from server: " + event);
    dispatch(setParent(data.parent));
  });
};

export const subscribeCreateComponent = (dispatch) => {
  socket.on("create-component", ({ id, component }) => {
    if (id === socket.id) {
      return;
    }
    dispatch(addComponent({ ...component, isEmitted: true }));
  });
};

export const subscribeUpdateComponent = (dispatch) => {
  socket.on("update-component", ({ id, component }) => {
    if (id === socket.id) {
      return;
    }
    dispatch(updateComponent({ ...component, isEmitted: true }));
  });
};

export const subscribeDeleteComponent = (dispatch) => {
  socket.on("delete-component", ({ id, component }) => {
    if (id === socket.id) {
      return;
    }
    dispatch(deleteComponent({ ...component, isEmitted: true }));
  });
};

export const subscribeCreateChat = (dispatch) => {
  socket.on("create-chat", ({ id, chat }) => {
    if (id === socket.id) {
      return;
    }

    chat.isEmitted = true;
    dispatch(addChat({ ...chat, isEmitted: true }));
  });
};

export const subscribeDeleteChat = (dispatch) => {
  socket.on("delete-chat", ({ id, chat }) => {
    if (id === socket.id) {
      return;
    }
    dispatch(deleteChat({ ...chat, isEmitted: true }));
  });
};

export const sendMessage = (message, room) => {
  socket.emit("message", { message, room });
};
