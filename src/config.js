import {
  MdOutlineDoorBack,
  MdOutlineInsertLink,
  MdOutlineNoteAlt,
  MdFileUpload,
} from "react-icons/md";

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
    label: "File",
    icon: <MdFileUpload size={"2.4rem"} color="#666" />,
    defaultComponent: {
      width: 36,
      height: 36,
      borderColorTop: false,
      backgroundColor: "#fff",
      content: "",
      type: "File",
    },
  },
  {
    type: "Room",
    label: "Room",
    icon: <MdOutlineDoorBack size={"2.4rem"} color="#666" />,
    defaultComponent: {
      width: 36,
      height: 36,
      borderColorTop: false,
      backgroundColor: "#fff",
      content: "",
      title: "New Room",
      type: "Room",
    },
  },
];

export const renderIconFile = (fileType) => {
  if (fileType.startsWith("text/xml")) {
    return "https://cdn-icons-png.flaticon.com/512/9034/9034293.png";
  } else if (fileType.includes("word")) {
    return "https://cdn-icons-png.flaticon.com/512/4726/4726038.png";
  } else if (fileType.includes("pdf")) {
    return "https://cdn-icons-png.flaticon.com/512/337/337946.png";
  } else if (fileType.includes("application/json")) {
    return "https://cdn-icons-png.flaticon.com/512/136/136525.png";
  } else if (
    fileType.includes("powerpoint") ||
    fileType.includes("presentation")
  ) {
    return "https://cdn-icons-png.flaticon.com/512/4726/4726014.png";
  } else if (fileType.includes("excel") || fileType.includes("sheet")) {
    return "https://cdn-icons-png.flaticon.com/512/2504/2504768.png";
  } else {
    return "https://cdn-icons-png.flaticon.com/512/607/607674.png";
  }
};

export const SERVER_URL = "http://localhost:3001";
