import {
  MdOutlineDoorBack,
  MdOutlineInsertLink,
  MdOutlineModeComment,
  MdOutlineNoteAlt,
} from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";

export const TOOL_ITEMS = [
  {
    label: "Note",
    icon: <MdOutlineNoteAlt size={"2.4rem"} color="#666" />,
    defaultComponent: {
      width: 300,
      height: 70,
      borderColorTop: false,
      backgroundColor: "#fff",
      content: "",
      type: "Note",
    },
  },
  {
    label: "Link",
    icon: <MdOutlineInsertLink size={"2.4rem"} color="#666" />,
    defaultComponent: {
      width: 300,
      height: 70,
      borderColorTop: false,
      backgroundColor: "#fff",
      content: "",
      type: "LinkPreview",
    },
  },
  {
    label: "Todo",
    icon: <RiTodoLine size={"2.4rem"} color="#666" />,
    defaultComponent: {
      width: 300,
      height: 70,
      borderColorTop: false,
      backgroundColor: "#fff",
      content: "",
      type: "Todo",
    },
  },
  {
    type: "Room",
    label: "Room",
    icon: <MdOutlineDoorBack size={"2.4rem"} color="#666" />,
    defaultComponent: {
      width: 100,
      height: 50,
      borderColorTop: false,
      backgroundColor: "#fff",
      content: "",
      type: "Room",
    },
  },
  {
    label: "Comment",
    icon: <MdOutlineModeComment size={"2.4rem"} color="#666" />,
    defaultComponent: {
      width: 100,
      height: 50,
      borderColorTop: false,
      backgroundColor: "#fff",
      content: "",
      type: "Comment",
    },
  },
];
