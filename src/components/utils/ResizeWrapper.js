import { useRef } from "react";
import Resize from "./resize.svg";

function ResizeWrapper({ setWidth, setHeight, children }) {
  const resizeRef = useRef();

  let mousePosition = { x: 0, y: 0 };

  const handleMouseMove = (e) => {
    e.stopPropagation();
    const { left, top } = resizeRef.current.getBoundingClientRect();
    const deltaX = e.pageX - left - mousePosition.x;
    const deltaY = e.pageY - top - mousePosition.y;
    setWidth((width) => width + deltaX);
    setHeight((height) => height + deltaY);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    mousePosition = {
      x: e.pageX - resizeRef.current.getBoundingClientRect().left,
      y: e.pageY - resizeRef.current.getBoundingClientRect().top,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      {children}
      <div
        className="resize"
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
        }}
        ref={resizeRef}
        onMouseDown={handleMouseDown}
      >
        <img
          style={{ width: "20px", height: "20px", pointerEvents: "none" }}
          src={Resize}
          alt=""
        />
      </div>
    </div>
  );
}

export default ResizeWrapper;
