import "../../styles/ui/main-page/Toolbar.css";
import ToolItem from "../../components/toolbar/ToolItem";
import { TOOL_ITEMS } from "../../config";
import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { initAppSize } from "../../common/store";

function Toolbar() {
  const toolbarRef = useRef();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const width = toolbarRef.current.offsetWidth;
    dispatch(
      initAppSize({
        toolbarWidth: width,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderedToolItems = TOOL_ITEMS.map((item, key) => {
    return <ToolItem key={key} {...item} />;
  });
  return (
    <div className="toolbar" ref={toolbarRef}>
      {renderedToolItems}
    </div>
  );
}

export default Toolbar;
