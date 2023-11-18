import { useRef, useState } from "react";
import "../../styles/components/utils/ScrollContainer.css";

function ScrollContainer({ children, width, height }) {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialScrollX, setInitialScrollX] = useState(0);
  const [initialScrollY, setInitialScrollY] = useState(0);

  const handleMouseDown = (e) => {
    if (!e.target.className.includes("draggable-component")) {
      setIsDragging(true);
      setInitialMouseX(e.pageX - scrollContainerRef.current.offsetLeft);
      setInitialMouseY(e.pageY - scrollContainerRef.current.offsetTop);
      setInitialScrollX(scrollContainerRef.current.scrollLeft);
      setInitialScrollY(scrollContainerRef.current.scrollTop);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    if (!e.target.className.includes("draggable-component")) {
      const currentMouseX = e.pageX - scrollContainerRef.current.offsetLeft;
      const currentMouseY = e.pageY - scrollContainerRef.current.offsetTop;
      const walkX = currentMouseX - initialMouseX;
      const walkY = currentMouseY - initialMouseY;
      scrollContainerRef.current.scrollLeft = initialScrollX - walkX;
      scrollContainerRef.current.scrollTop = initialScrollY - walkY;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="scroll-container"
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="scroll-fix">
        <div
          className="scroll-content"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default ScrollContainer;
