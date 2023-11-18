import HeaderButton from "../../components/header/HeaderButton";
import Logo from "../../components/header/Logo";
import RoomName from "../../components/header/RoomName";
import "../../styles/ui/main-page/Header.css";

function Header() {
  return (
    <div id="header" className="container">
      <Logo />

      <RoomName />

      <HeaderButton />
    </div>
  );
}

export default Header;
