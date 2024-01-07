/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/components/workspace/Note.css";
import ResizableCardNote from "../utils/ResizableCardNote";

function Note({ component }) {
  return (
    <ResizableCardNote component={component}>
      {component.content}
    </ResizableCardNote>
  );
}

export default Note;
