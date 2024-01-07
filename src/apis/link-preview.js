import axios from "axios";
import { SERVER_URL } from "../config";

export async function getLinkPreview(url) {
  const response = await axios.get(
    SERVER_URL + "/api/link-preview?url=" + url,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}
