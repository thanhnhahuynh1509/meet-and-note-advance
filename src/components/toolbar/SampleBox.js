import Draggable from "react-draggable";

function SampleBox({ component }) {
  if (!component?.type) {
    return <></>;
  }
  return (
    <Draggable
      defaultClassName="sample-drag"
      position={{ x: component.x, y: component.y }}
    >
      <div className="card" style={{ backgroundColor: "#fff" }}>
        <div style={{ zIndex: 1000000, fontSize: "1.6rem" }}>
          {component.label}
        </div>
      </div>
    </Draggable>
  );
}

export default SampleBox;
