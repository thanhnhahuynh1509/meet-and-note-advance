/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DraggableComponent from "./DraggableComponent";
import "../../styles/components/workspace/Card.css";
import ResizeWrapper from "./ResizeWrapper";
import { deleteComponent, updateComponent } from "../../common/store";
import { MdDownload } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { SERVER_URL } from "../../config";
import { download } from "../../apis/download";

function ResizableCardImage({ component }) {
  const cardRef = useRef();
  const dispatch = useDispatch();
  const [onFocus, setOnFocus] = useState(false);
  const [heightState, setHeightState] = useState(component.height);
  const [widthState, setWidthState] = useState(component.width);
  const [content, setContent] = useState(component.content);
  let currentWidth = widthState;
  let currentHeight = heightState;

  useEffect(() => {
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
            <div
              style={{
                position: "absolute",
                top: 30,
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
                e.preventDefault();
                e.stopPropagation();
                download(content.filePath, content.filename);
              }}
            >
              <MdDownload size={18} style={{ pointerEvents: "none" }} />
            </div>
            <img
              src={`${SERVER_URL}/${component.content.filePath}`}
              width={widthState}
              alt=""
            />

            <div
              style={{
                textAlign: "center",
                fontSize: "1.6rem",
                margin: ".5rem 0rem",
                position: "absolute",
                minWidth: "100px",
                whiteSpace: "pre-wrap",
                left: "50%",
                top: "100%",
                transform: "translateX(-50%)",
              }}
              contentEditable
              suppressContentEditableWarning
              onFocus={(e) => {
                setOnFocus(true);
              }}
              onBlur={(e) => {
                if (component?.content) {
                  dispatch(
                    updateComponent({
                      ...component,
                      content: {
                        ...component.content,
                        filename: e.currentTarget.textContent,
                      },
                    })
                  );
                }
                setOnFocus(false);
              }}
              spellCheck={false}
            >
              {content?.filename}
            </div>
          </div>
        </div>
      </ResizeWrapper>
    </DraggableComponent>
  );
}

export default ResizableCardImage;
