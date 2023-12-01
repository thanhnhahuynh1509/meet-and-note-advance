import Header from "../ui/main-page/Header";
import Toolbar from "../ui/main-page/Toolbar";
import Workspace from "../ui/main-page/Workspace";

function MainPage() {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <Header />
      <div style={{ display: "flex" }}>
        <Toolbar />
        <Workspace />
      </div>
    </div>
  );
}

export default MainPage;
