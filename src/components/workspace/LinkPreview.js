import ResizableCardLink from "../utils/ResizableCardLink";

function LinkPreview({ component }) {
  return (
    <ResizableCardLink component={component}>
      {component.content}
    </ResizableCardLink>
  );
}

export default LinkPreview;
