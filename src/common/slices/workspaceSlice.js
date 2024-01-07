import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { socket } from "../../socket/socket";

const STEP_INCREASE = 200;

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    width: 0,
    height: 0,
    maxWidth: 0,
    maxHeight: 0,
    components: [
      {
        id: 1,
        type: "Note",
        x: 100,
        y: 100,
        width: 300,
        height: 70,
        borderColorTop: false,
        backgroundColor: "#fff",
        content: "First Note",
      },
      {
        id: 2,
        type: "Note",
        x: 300,
        y: 300,
        width: 300,
        height: 70,
        borderColorTop: false,
        backgroundColor: "#fff",
        content: "Second Note",
      },
    ],
    room: undefined,
    parent: {
      title: "Home",
    },
  },

  reducers: {
    initSize: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    setRoom: (state, action) => {
      return {
        ...state,
        room: action.payload,
      };
    },

    setParent: (state, action) => {
      return {
        ...state,
        parent: action.payload,
      };
    },

    loadComponents: (state, action) => {
      return {
        ...state,
        components: action.payload,
      };
    },

    addComponent: (state, { payload }) => {
      const duplicateComponent = state.components.find(
        (c) => c.id === payload?.id
      );
      if (duplicateComponent) {
        return;
      }
      payload.parent = state.room;
      state.components.push(payload);
      if (!payload.isEmitted) {
        socket.emit("create-component", {
          component: payload,
          room: state.room,
        });
      }
    },

    updateComponent: (state, action) => {
      return {
        ...state,
        components: state.components.map((component) => {
          if (component.id === action.payload.id) {
            const updatedData = {
              ...component,
              ...action.payload,
            };
            if (!action.payload.isEmitted) {
              socket.emit("update-component", {
                component: updatedData,
                room: state.room,
              });
            }
            delete updatedData.isEmitted;
            return updatedData;
          }
          return component;
        }),
      };
    },

    deleteComponent: (state, action) => {
      if (!action.payload.isEmitted) {
        socket.emit("delete-component", {
          component: action.payload,
          room: state.room,
        });
      }
      const components = state.components.filter(
        (component) => component.id !== action.payload.id
      );
      return {
        ...state,
        components: components,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(updateComponent), (state) => {
      let maxCpWidth = state.maxWidth;
      let maxCpHeight = state.maxHeight;
      for (const component of state.components) {
        const calculateWidth = component.x + component.width + STEP_INCREASE;
        const calculateHeight = component.y + component.height + STEP_INCREASE;
        if (calculateWidth > maxCpWidth) {
          maxCpWidth = calculateWidth;
        }
        if (calculateHeight > maxCpHeight) {
          maxCpHeight = calculateHeight;
        }
      }
      return {
        ...state,
        width: maxCpWidth,
        height: maxCpHeight,
      };
    });
  },
});

export const {
  initSize,
  updateComponent,
  addComponent,
  deleteComponent,
  setRoom,
  setParent,
  loadComponents,
} = workspaceSlice.actions;
export const workspaceState = (state) => state.workspace;

export default workspaceSlice.reducer;
