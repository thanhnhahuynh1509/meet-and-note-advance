import { useRef } from "react";
import ScrollContainer from "../../components/utils/ScrollContainer";
import "../../styles/ui/main-page/Workspace.css";

function Workspace() {
  const workspaceRef = useRef();
  return (
    <div id="workspace" ref={workspaceRef}>
      <ScrollContainer
        width={workspaceRef.current.clientWidth}
        height={workspaceRef.current.clientHeight}
      ></ScrollContainer>
    </div>
  );
}

export default Workspace;
