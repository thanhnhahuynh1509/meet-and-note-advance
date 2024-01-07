import axios from "axios";
import fileDownload from "js-file-download";
import { SERVER_URL } from "../config";

export async function download(filePath, filename) {
  const response = await axios.get(SERVER_URL + "/" + filePath, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    responseType: "blob",
  });
  fileDownload(response.data, filename);
}
