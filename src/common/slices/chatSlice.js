import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket/socket";

const chatSlice = createSlice({
  name: "chat",
  initialState: [],

  reducers: {
    setChats: (state, action) => {
      return action?.payload?.reverse();
    },

    appendChats: (state, action) => {
      const idsExisted = state.map((chat) => chat.id);
      state.unshift(
        ...action?.payload
          ?.reverse()
          .filter((chat) => !idsExisted.includes(chat.id))
      );
    },

    addChat: (state, action) => {
      state.push(action.payload);
      if (!action.payload.isEmitted) {
        socket.emit("create-chat", {
          chat: action.payload,
          room: action.payload.parent,
        });
      }
    },

    deleteChat: (state, action) => {
      if (!action.payload.isEmitted) {
        socket.emit("delete-chat", {
          chat: action.payload,
          room: action.payload.parent,
        });
      }

      return state.filter((chat) => chat.id !== action.payload.id);
    },
  },
});

export const { setChats, addChat, deleteChat, appendChats } = chatSlice.actions;
export const chatState = (state) => state.chat;

export default chatSlice.reducer;
