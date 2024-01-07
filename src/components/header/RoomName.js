import { useSelector } from "react-redux";
import { workspaceState } from "../../common/store";

function RoomName() {
  const wpState = useSelector(workspaceState);
  return (
    <div style={{ fontSize: "1.6rem", fontWeight: "600" }}>
      {wpState?.parent?.title}
    </div>
  );
}

export default RoomName;
