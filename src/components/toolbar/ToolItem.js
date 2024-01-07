import { useState } from "react";
import "../../styles/components/toolbar/ToolItem.css";
import { createPortal } from "react-dom";
import SampleBox from "./SampleBox";
import { useDispatch, useSelector } from "react-redux";
import { addComponent } from "../../common/slices/workspaceSlice";
import { v4 as uuidv4 } from "uuid";
import { appSizeState } from "../../common/store";

function ToolItem({ icon, label, defaultComponent }) {
  const [component, setComponent] = useState(null);
  const dispatch = useDispatch();
  const appSize = useSelector(appSizeState);
  const handleOnMouseDown = (e) => {
    setComponent({
      ...defaultComponent,
      x: e.clientX,
      y: e.clientY,
      id: uuidv4(),
    });
    document.addEventListener("mouseup", handleOnMouseUp);
    document.addEventListener("mousemove", handleOnMouseMove);
  };

  const handleOnMouseMove = (e) => {
    setComponent((component) => {
      if (!component) return;
      return {
        ...component,
        label: label,
        x: e.clientX,
        y: e.clientY,
      };
    });
  };

  const handleOnMouseUp = (e) => {
    document.removeEventListener("mouseup", handleOnMouseUp);
    document.removeEventListener("mousemove", handleOnMouseMove);
    setComponent((component) => {
      if (!e.target?.className.includes("tool")) {
        dispatch(
          addComponent({
            ...component,
            x: component.x - appSize.toolbarWidth,
            y: component.y - appSize.headerHeight,
          })
        );
      }
      return null;
    });
  };

  return (
    <>
      {createPortal(
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            pointerEvents: "none",
          }}
        >
          <SampleBox component={component} />
        </div>,
        document.body
      )}
      <div
        className="tool-item"
        onMouseDown={(e) => {
          e.preventDefault();
          handleOnMouseDown(e);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          handleOnMouseUp(e);
        }}
      >
        <div className="tool-item-icon">{icon}</div>
        <div className="tool-item-label">{label}</div>
      </div>
    </>
  );
}

export default ToolItem;
