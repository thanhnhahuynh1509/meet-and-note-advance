/* eslint-disable react-hooks/exhaustive-deps */

import { useLayoutEffect, useRef } from "react";
import HeaderButton from "../../components/header/HeaderButton";
import Logo from "../../components/header/Logo";
import RoomName from "../../components/header/RoomName";
import "../../styles/ui/main-page/Header.css";
import { useDispatch } from "react-redux";
import { initAppSize } from "../../common/store";

function Header() {
  const headerRef = useRef();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const height = headerRef.current.offsetHeight;
    dispatch(
      initAppSize({
        headerHeight: height,
      })
    );
  }, []);
  return (
    <div id="header" className="container" ref={headerRef}>
      <Logo />
      <RoomName />
      <HeaderButton />
    </div>
  );
}

export default Header;
