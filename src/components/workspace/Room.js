import { useEffect, useRef, useState } from "react";
import DraggableComponent from "../utils/DraggableComponent";
import { useDispatch } from "react-redux";
import { deleteComponent, updateComponent } from "../../common/store";
import { FiTrash2 } from "react-icons/fi";
import { MdMeetingRoom } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Room({ component }) {
  const cardRef = useRef();
  const dispatch = useDispatch();
  const [heightState, setHeightState] = useState(component.height);
  const [widthState, setWidthState] = useState(component.width);
  const [onFocus, setOnFocus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setHeightState(component.height);
    setWidthState(component.width);
  }, [component]);

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
      disable={onFocus}
    >
      <div
        className="card"
        style={{
          borderTop: component.borderColorTop
            ? `.6rem solid ${component.borderColorTop}`
            : component.borderColorTop,
          backgroundColor: component.backgroundColor,
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
              e.preventDefault();
              e.stopPropagation();
              handleOnDelete();
            }}
          >
            <FiTrash2 size={18} style={{ pointerEvents: "none" }} />
          </div>
          <div
            style={{ cursor: "pointer" }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              return navigate(`/${component.id}`);
            }}
          >
            <MdMeetingRoom size={24} style={{ pointerEvents: "none" }} />
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.6rem",
          margin: ".5rem 0rem",
          position: "absolute",
          width: "100px",
          whiteSpace: "pre-wrap",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        contentEditable
        suppressContentEditableWarning
        onFocus={(e) => {
          setOnFocus(true);
        }}
        onBlur={(e) => {
          if (component?.title) {
            dispatch(
              updateComponent({
                ...component,
                title: e.currentTarget.textContent,
              })
            );
          }
          setOnFocus(false);
        }}
        spellCheck={false}
      >
        {component?.title}
      </div>
    </DraggableComponent>
  );
}

export default Room;
