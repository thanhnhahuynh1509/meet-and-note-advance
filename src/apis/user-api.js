import axios from "axios";
import { SERVER_URL } from "../config";

export async function signUp(user) {
  return (await axios.post(`${SERVER_URL}/api/users/sign-up`, user)).data;
}

export async function signIn(user) {
  return (await axios.post(`${SERVER_URL}/api/users/sign-in`, user)).data;
}

export async function getMe() {
  return (
    await axios.get(`${SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  ).data;
}
