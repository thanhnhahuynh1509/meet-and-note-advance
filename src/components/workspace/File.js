import { FiTrash2 } from "react-icons/fi";
import DraggableComponent from "../utils/DraggableComponent";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComponent, updateComponent } from "../../common/store";
import { RiFolderUploadLine } from "react-icons/ri";
import axios from "axios";
import { SERVER_URL, renderIconFile } from "../../config";
import { download } from "../../apis/download";
import ResizableCardVideo from "../utils/ResizableCardVideo";
import ResizableCardImage from "../utils/ResizableCardImage";

function File({ component }) {
  const cardRef = useRef();
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [heightState, setHeightState] = useState(component.height);
  const [widthState, setWidthState] = useState(component.width);
  const [content, setContent] = useState(component.content);
  const [selectedFile, setSelectedFile] = useState({});
  const [uploadProgress, setUploadProgress] = useState();
  const [isUploadFinished, setIsUploadFinished] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    setHeightState(component.height);
    setWidthState(component.width);
    setContent(component.content);
    setIsUploadFinished(component?.content);
  }, [component]);

  const handleOnStopDrag = (_, data) => {
    dispatch(
      updateComponent({
        ...component,
        x: data.x,
        y: data.y,
      })
    );
  };

  const handleOnDelete = () => {
    dispatch(deleteComponent(component));
  };

  const handleOnUpload = (e) => {
    const files = e.target.files;
    setIsUploadFinished(false);
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(files[0]);
      const chunkSize = 1024 * 1024 * 10; // 1KB
      const totalChunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;

      const uploadChunks = async () => {
        const fileReader = new FileReader();
        let response = null;

        fileReader.onload = async (event) => {
          try {
            const chunkData = event.target.result;

            response = await axios.post(`${SERVER_URL}/api/upload`, chunkData, {
              headers: {
                "Content-Type": "application/octet-stream",
                "Current-Chunk": currentChunk,
                "Total-Chunks": totalChunks,
                "File-Name": file.name,
                "File-Type": file.type,
                "Component-ID": component.id,
                Authorization: localStorage.getItem("token"),
              },
            });

            const progress = Math.ceil(
              ((currentChunk * chunkSize) / file.size) * 100
            );
            setUploadProgress(progress);

            currentChunk++;

            if (currentChunk < totalChunks) {
              uploadChunks();
            } else {
              setUploadProgress(100);
              setIsUploadFinished(true);
              dispatch(
                updateComponent({ ...component, content: response?.data })
              );
            }
          } catch (e) {
            console.log(e);
          } finally {
            setIsUploadFinished(true);
          }
        };

        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);

        fileReader.readAsArrayBuffer(file.slice(start, end));
      };

      uploadChunks();
    }
  };

  const handleDownload = (e) => {
    download(content.filePath, content.filename);
  };

  return (
    <>
      {(content?.fileType?.startsWith("video") ||
        content?.fileType?.startsWith("audio")) && (
        <ResizableCardVideo component={component} />
      )}
      {content?.fileType?.startsWith("image") && (
        <ResizableCardImage component={component} />
      )}
      {(!content.fileType ||
        (!content.fileType.startsWith("video") &&
          !content.fileType.startsWith("audio") &&
          !content.fileType.startsWith("image"))) && (
        <DraggableComponent
          posX={component.x}
          posY={component.y}
          cancel={".card-content, .resize"}
          componentRef={cardRef}
          onStop={handleOnStopDrag}
          disable={onFocus}
        >
          <div
            className="card"
            style={{
              borderTop: component.borderColorTop
                ? `.6rem solid ${component.borderColorTop}`
                : component.borderColorTop,
              backgroundColor: component.backgroundColor,
            }}
          >
            <div
              className="card-content"
              style={{
                width: `${widthState}px`,
                minHeight: `${heightState}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  display: "inline-flex",
                  width: "36px",
                  height: "36px",
                  background: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "1000rem",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOnDelete();
                }}
              >
                <FiTrash2 size={18} style={{ pointerEvents: "none" }} />
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isUploadFinished) {
                    fileRef.current.click();
                  }
                  if (isUploadFinished && component?.content) {
                    try {
                      handleDownload(e);
                    } catch (e) {
                      alert("Something went wrong while downloading file");
                      console.log(e);
                    }
                  }
                }}
              >
                {!content &&
                  (uploadProgress == null || uploadProgress === undefined) && (
                    <div>
                      <RiFolderUploadLine
                        size={24}
                        style={{ pointerEvents: "none" }}
                      />
                      <input
                        ref={fileRef}
                        type="file"
                        multiple={false}
                        hidden
                        onChange={handleOnUpload}
                      />
                    </div>
                  )}
                {uploadProgress && !content && <div>{uploadProgress}%</div>}
                {content && (
                  <div>
                    <>
                      {content?.fileType?.startsWith("audio") && (
                        <div>Audio</div>
                      )}
                      {content?.fileType?.startsWith("image") && (
                        <div>Image</div>
                      )}

                      <div>
                        <img
                          src={renderIconFile(content.fileType)}
                          alt=""
                          width={"36px"}
                          height={"36px"}
                        />
                      </div>
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "1.6rem",
              margin: ".5rem 0rem",
              position: "absolute",
              width: "100px",
              whiteSpace: "pre-wrap",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            contentEditable
            suppressContentEditableWarning
            onFocus={(e) => {
              setOnFocus(true);
            }}
            onBlur={(e) => {
              if (component?.content) {
                dispatch(
                  updateComponent({
                    ...component,
                    content: {
                      ...component.content,
                      filename: e.currentTarget.textContent,
                    },
                  })
                );
              }
              setOnFocus(false);
            }}
            spellCheck={false}
          >
            {content?.filename || selectedFile.name}
          </div>
        </DraggableComponent>
      )}
    </>
  );
}

export default File;
