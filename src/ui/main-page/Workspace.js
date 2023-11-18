import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ScrollContainer from "../../components/utils/ScrollContainer";
import "../../styles/ui/main-page/Workspace.css";

function Workspace() {
  const workspaceRef = useRef();
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [resizeTrigger, setResizeTrigger] = useState(false);

  const handleResize = () => {
    setResizeTrigger((r) => !r);
  };

  useLayoutEffect(() => {
    setScrollWidth(workspaceRef.current.offsetWidth);
    setScrollHeight(workspaceRef.current.offsetHeight);
  }, [resizeTrigger]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="workspace" ref={workspaceRef}>
      <ScrollContainer
        width={scrollWidth}
        height={scrollHeight}
      ></ScrollContainer>
    </div>
  );
}

export default Workspace;
