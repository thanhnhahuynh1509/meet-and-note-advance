import DraggableComponent from "../utils/DraggableComponent";
import "../../styles/components/workspace/Note.css";
import { useState } from "react";
import ResizeWrapper from "../utils/ResizeWrapper";

function Note({
  width = 300,
  height = 70,
  borderColorTop = false,
  backgroundColor = "#fff",
  children,
}) {
  const [onFocus, setOnFocus] = useState(false);

  const [heightState, setHeightState] = useState(height);
  const [widthState, setWidthState] = useState(width);

  return (
    <DraggableComponent posX={100} posY={100} cancel={".note-content, .resize"}>
      <ResizeWrapper setHeight={setHeightState} setWidth={setWidthState}>
        <div
          className="note card"
          style={{
            borderTop: borderColorTop
              ? `.6rem solid ${borderColorTop}`
              : borderColorTop,
            backgroundColor,
            border: onFocus ? `.1rem solid #464646` : onFocus,
          }}
        >
          <div
            className="note-content card-content"
            contentEditable
            suppressContentEditableWarning
            style={{ width: `${widthState}px`, minHeight: `${heightState}px` }}
            onFocus={() => {
              setOnFocus(true);
            }}
            onBlur={() => {
              setOnFocus(false);
            }}
          >
            {children}
          </div>
        </div>
      </ResizeWrapper>
    </DraggableComponent>
  );
}

export default Note;
