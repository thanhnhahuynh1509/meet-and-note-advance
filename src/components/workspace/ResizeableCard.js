/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DraggableComponent from "../utils/DraggableComponent";
import "../../styles/components/workspace/Card.css";
import ResizeWrapper from "../utils/ResizeWrapper";
import { updateComponent } from "../../common/store";

function ResizableCard({ component, children }) {
  const cardRef = useRef();
  const workspaceDispatch = useDispatch();
  const [onFocus, setOnFocus] = useState(false);
  const [heightState, setHeightState] = useState(component.height);
  const [widthState, setWidthState] = useState(component.width);

  let currentWidth = widthState;
  let currentHeight = heightState;

  const handleOnResize = (_, data) => {
    setHeightState((height) => {
      currentHeight = height + data.deltaY;
      return currentHeight;
    });
    setWidthState((width) => {
      currentWidth = width + data.deltaX;
      return currentWidth;
    });
  };

  const handleOnStopResize = (_) => {
    workspaceDispatch(
      updateComponent({
        ...component,
        width: currentWidth,
        height: currentHeight,
      })
    );
  };

  const handleOnStopDrag = (_, data) => {
    workspaceDispatch(
      updateComponent({
        ...component,
        x: data.x,
        y: data.y,
      })
    );
  };

  return (
    <DraggableComponent
      posX={component.x}
      posY={component.y}
      cancel={".card-content, .resize"}
      componentRef={cardRef}
      onStop={handleOnStopDrag}
    >
      <ResizeWrapper onResize={handleOnResize} onStop={handleOnStopResize}>
        <div
          className="card"
          style={{
            borderTop: component.borderColorTop
              ? `.6rem solid ${component.borderColorTop}`
              : component.borderColorTop,
            backgroundColor: component.backgroundColor,
            border: onFocus ? `.1rem solid #464646` : onFocus,
          }}
        >
          <div
            className="card-content"
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

export default ResizableCard;
