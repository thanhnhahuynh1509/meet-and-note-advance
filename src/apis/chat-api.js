import axios from "axios";
import { SERVER_URL } from "../config";

export async function getChatsByParent(id, pageSize = 1, pageNumber = 10) {
  return (
    await axios.get(
      `${SERVER_URL}/api/chats/parent/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
  ).data;
}
