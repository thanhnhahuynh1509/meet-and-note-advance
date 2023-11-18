import { useState } from "react";
import Draggable from "react-draggable";
import "../../styles/components/utils/DraggableComponent.css";

function DraggableComponent({
  children,
  onStart,
  onDrag,
  onStop,
  onMouseDown,
}) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <Draggable
      defaultClassName="draggable-component"
      defaultClassNameDragging="dragging-component"
      defaultClassNameDragged="dragged-component"
      bounds={{ left: 0, top: 0 }}
      position={{ x: x, y: y }}
      onMouseDown={(e, data) => {
        if (onMouseDown) {
          onMouseDown(e, data);
        }
      }}
      onStart={(e, data) => {
        if (onStart) {
          onStart(e, data);
        }
      }}
      onDrag={(e, data) => {
        e.stopPropagation();
        if (onDrag) {
          onDrag(e, data);
        }
      }}
      onStop={(e, data) => {
        e.stopPropagation();
        setX(data.x);
        setY(data.y);
        if (onStop) {
          onStop(e, data);
        }
      }}
    >
      {children}
    </Draggable>
  );
}

export default DraggableComponent;
