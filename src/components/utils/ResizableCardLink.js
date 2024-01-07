/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DraggableComponent from "./DraggableComponent";
import "../../styles/components/workspace/Card.css";
import ResizeWrapper from "./ResizeWrapper";
import { deleteComponent, updateComponent } from "../../common/store";
import { FiTrash2 } from "react-icons/fi";
import { getLinkPreview } from "../../apis/link-preview";

function ResizableCardLink({ component }) {
  const cardRef = useRef();
  const dispatch = useDispatch();
  const [onFocus, setOnFocus] = useState(false);
  const [heightState, setHeightState] = useState(component.height);
  const [widthState, setWidthState] = useState(component.width);
  const [content, setContent] = useState(component.content);

  let currentWidth = widthState;
  let currentHeight = heightState;

  useEffect(() => {
    setHeightState(component.height);
    setWidthState(component.width);
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
            style={{ width: `${widthState}px`, minHeight: `${heightState}px` }}
            onFocus={() => {
              setOnFocus(true);
            }}
            onBlur={async (e) => {
              e.stopPropagation();
              setOnFocus(false);
              dispatch(updateComponent({ ...component, content: content }));
              if (
                content &&
                (content.startsWith("http://") ||
                  content.startsWith("https://"))
              ) {
                try {
                  const data = await getLinkPreview(content);
                  dispatch(updateComponent({ ...component, content: data }));
                } catch (e) {
                  console.log(e);
                }
              }
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
            {(!component.content || !typeof component.content === "string") && (
              <textarea
                type="text"
                value={content}
                style={{
                  width: `${widthState}px`,
                  minHeight: `${heightState}px`,
                  border: "none",
                  outline: "none",
                  resize: "none",
                }}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            )}
            {typeof component.content === "object" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <img src={component.content.images[0]} alt="" />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.open(component.content?.url, "_blank");
                  }}
                >
                  <img
                    style={{ width: "24px" }}
                    src={component.content?.favicons[0]}
                    alt=""
                  />
                  <span
                    style={{
                      fontSize: "1.4rem",
                      color: "#707070",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {component.content.url}
                  </span>
                </div>
                <div style={{ marginTop: "0rem" }}>
                  <p
                    style={{
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#333",
                    }}
                  >
                    {component.content.title}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#707070",
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {component.content.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </ResizeWrapper>
    </DraggableComponent>
  );
}

export default ResizableCardLink;
