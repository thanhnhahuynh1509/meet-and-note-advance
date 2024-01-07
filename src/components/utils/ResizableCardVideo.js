/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DraggableComponent from "./DraggableComponent";
import "../../styles/components/workspace/Card.css";
import ResizeWrapper from "./ResizeWrapper";
import { deleteComponent, updateComponent } from "../../common/store";
import { FiTrash2 } from "react-icons/fi";
import { SERVER_URL } from "../../config";

function ResizableCardVideo({ component }) {
  const cardRef = useRef();
  const dispatch = useDispatch();
  const [onFocus, setOnFocus] = useState(false);
  const [heightState, setHeightState] = useState(component.height);
  const [widthState, setWidthState] = useState(component.width);
  const [content, setContent] = useState(component.content);
  let currentWidth = widthState;
  let currentHeight = heightState;

  useEffect(() => {
    setHeightState(component.height < 80 ? 80 : component.height);
    setWidthState(component.width < 400 ? 400 : component.width);
    setContent(component.content);
  }, [component]);

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
    dispatch(
      updateComponent({
        ...component,
        width: currentWidth,
        height: currentHeight,
      })
    );
  };

  const handleOnStopDrag = (_, data) => {
    dispatch(
      updateComponent({
        ...component,
        x: data.x,
        y: data.y,
      })
    );
  };

  const handleOnDelete = () => {
    dispatch(deleteComponent(component));
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
            style={{
              width: `${widthState}px`,
              minHeight: `${heightState}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onFocus={() => {
              setOnFocus(true);
            }}
            onBlur={async (e) => {
              e.stopPropagation();
              setOnFocus(false);
              dispatch(updateComponent({ ...component, content: content }));
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                display: "inline-flex",
                width: "36px",
                height: "36px",
                background: "#fff",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1000rem",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
              onClick={(e) => {
                console.log("ok");
                e.preventDefault();
                e.stopPropagation();
                handleOnDelete();
              }}
            >
              <FiTrash2 size={18} style={{ pointerEvents: "none" }} />
            </div>
            <video
              src={`${SERVER_URL}/${component.content.filePath}`}
              controls
              width={widthState}
              height={heightState}
            />
          </div>
        </div>
      </ResizeWrapper>
    </DraggableComponent>
  );
}

export default ResizableCardVideo;
