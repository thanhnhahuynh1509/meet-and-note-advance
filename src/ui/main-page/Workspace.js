import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollContainer from "../../components/utils/ScrollContainer";
import "../../styles/ui/main-page/Workspace.css";
import { workspaceState, initSize } from "../../common/store";

function Workspace() {
  const workspaceRef = useRef();
  const workspace = useSelector(workspaceState);
  const workspaceDispatch = useDispatch();
  const [resizeTrigger, setResizeTrigger] = useState(false);
  const handleResize = () => {
    setResizeTrigger((r) => !r);
  };

  useLayoutEffect(() => {
    const width = workspaceRef.current.offsetWidth;
    const height = workspaceRef.current.offsetHeight;
    workspaceDispatch(
      initSize({
        width: width,
        height: height,
        maxWidth: width,
        maxHeight: height,
      })
    );
  }, [resizeTrigger, workspaceDispatch]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderedComponents = workspace?.components?.map((component) => {
    const {
      default: Component,
    } = require(`../../components/workspace/${component.type}`);
    return (
      <Component key={component.id} component={component}>
        {component.content}
      </Component>
    );
  });

  return (
    <div id="workspace" ref={workspaceRef}>
      <ScrollContainer width={workspace.width} height={workspace.height}>
        {renderedComponents}
      </ScrollContainer>
    </div>
  );
}

export default Workspace;
