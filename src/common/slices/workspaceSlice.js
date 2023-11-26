import { createSlice, isAnyOf } from "@reduxjs/toolkit";

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
  },

  reducers: {
    initSize: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    updateComponent: (state, action) => {
      return {
        ...state,
        components: state.components.map((component) => {
          if (component.id === action.payload.id) {
            return {
              ...component,
              ...action.payload,
            };
          }
          return component;
        }),
      };
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(updateComponent), (state) => {
      console.log("update");
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

export const { initSize, updateComponent } = workspaceSlice.actions;
export const workspaceState = (state) => state.workspace;

export default workspaceSlice.reducer;
