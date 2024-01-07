import axios from "axios";
import { SERVER_URL } from "../config";

export async function getComponentById(id) {
  return (
    await axios.get(`${SERVER_URL}/api/components/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data;
}

export async function getComponentsByParent(id) {
  return (
    await axios.get(`${SERVER_URL}/api/components/parent/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data;
}
