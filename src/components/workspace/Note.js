/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/components/workspace/Note.css";
import ResizableCard from "./ResizeableCard";

function Note({ component, children }) {
  return <ResizableCard component={component}>{children}</ResizableCard>;
}

export default Note;
